import { Link, useNavigate } from "react-router-dom";
import { getRole } from "../utils/role";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const role = (getRole() || "").toUpperCase();
    const username = localStorage.getItem("username");

    if (!role) return null;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/", { replace: true });
    };

    return (
        <div className="sidebar">

            <div className="logo-container">
                <img src="/bnr-logo.png" alt="BNR Logo" className="logo-img" />
                <h2 className="logo-text">BNR</h2>
            </div>

            <div className="profile-box">
                <div className="avatar">👤</div>
                <div>
                    <p className="username">{username}</p>
                </div>
            </div>

            <nav>
                <Link to="/dashboard">Dashboard</Link>
                {role === "ADMIN" && <Link to="/users">Users</Link>}
                {role === "HR" && <Link to="/bonds">Bonds</Link>}
                {role === "MANAGER" && (
                    <>
                        <Link to="/approvals">Approvals</Link>
                        <Link to="/bond-list">Bond List</Link>
                    </>
                )}
                {role === "AUDITOR" && <Link to="/reports">Reports</Link>}
            </nav>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default Sidebar;