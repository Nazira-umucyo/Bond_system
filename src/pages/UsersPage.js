import { useEffect, useState } from "react";
import axios from "axios";
import "./UsersPage.css";

function UsersPage() {
    const [users, setUsers] = useState([]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("HR");

    const [message, setMessage] = useState("");

    const roleFromStorage = localStorage.getItem("role");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const createUser = async () => {
    if (!username || !password || !role) {
        setMessage("Please fill all fields ❌");
        return;
    }

    try {
        const payload = {
            username: username.trim(),
            password: password.trim(),
            role: role
        };

        console.log("SENDING USER:", payload);

        await axios.post("http://localhost:8080/users/create", payload);

        setMessage("User created successfully ✅");

        setUsername("");
        setPassword("");
        setRole("HR");

        fetchUsers();

    } catch (error) {
        console.error("CREATE USER ERROR:", error);

        setMessage(
            error.response?.data?.error ||
            error.response?.data?.message ||
            "User Already Exists ❌"
        );
    }
};

    // ACCESS CONTROL
    if (roleFromStorage !== "ADMIN") {
        return <h2>Access Denied 🚫</h2>;
    }

    return (
        <div className="users-container">

            <h1>User Management (Admin)</h1>

            <div className="user-form">

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
>
    <option value="ADMIN">ADMIN</option>
    <option value="HR">HR</option>
    <option value="MANAGER">MANAGER</option>
    <option value="AUDITOR">AUDITOR</option>
</select>

                <button onClick={createUser}>
                    Create User
                </button>

                <p>{message}</p>
            </div>

            <h2>All Users</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.password}</td>
                            <td>{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default UsersPage;