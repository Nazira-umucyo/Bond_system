import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";
import api from "../utils/Api";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Fill all fields");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/users/login", {
                username: username,
                password: password,
            });

            const data = response.data;

            localStorage.setItem("role", data.role);
            localStorage.setItem("username", data.username);
            localStorage.setItem("token", "logged_in");

            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error(error);
            alert("Wrong username or password");
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">National Bank Of Rwanda</h1>
                <p className="login-subtitle">Bond Management System</p>

                <input
                    className="login-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login-button" onClick={handleLogin}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}

export default LoginPage;