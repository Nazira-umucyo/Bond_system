import { useState, useEffect } from "react";  
function UsersList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) =>{
        setUsers(data);
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