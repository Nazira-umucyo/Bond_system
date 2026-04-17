import { useState, useEffect } from "react";
import api from "../utils/Api";

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/users")
            .then((response) => {
                setUsers(response.data);
            });
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;