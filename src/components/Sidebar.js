import { Link, useNavigate } from "react-router-dom";
import { getRole } from "../utils/role";
import { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const role = (getRole() || "").toUpperCase();
    const username = localStorage.getItem("username");
    const [darkMode, setDarkMode] = useState(false);
    const [lang, setLang] = useState("en");

    if (!role) return null;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/", { replace: true });
    };

    const toggleDark = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    const t = {
        dashboard: lang === "en" ? "Dashboard" : "Tableau de bord",
        users: lang === "en" ? "Users" : "Utilisateurs",
        bonds: lang === "en" ? "Bonds" : "Cautions",
        approvals: lang === "en" ? "Approvals" : "Approbations",
        bondList: lang === "en" ? "Bond List" : "Liste des cautions",
        reports: lang === "en" ? "Reports" : "Rapports",
        logout: lang === "en" ? "Logout" : "Déconnexion",
        footer: lang === "en" ? "© 2026 Bond Management System - BNR" : "© 2026 Système de gestion - BNR",
    };

    return (
        <div className="sidebar">

            {/* 🔷 LOGO SECTION */}
            <div className="logo-container">
                <img src="/bnr-logo.png" alt="BNR Logo" className="logo-img" />
                <h2 className="logo-text">BNR</h2>
            </div>

            {/* 👤 PROFILE SECTION */}
            <div className="profile-box">
                <div className="avatar">👤</div>
                <div>
                    <p className="username">{username}</p>
                </div>
            </div>

            {/* 🔗 NAVIGATION */}
            <nav>
                <Link to="/dashboard">{t.dashboard}</Link>
                {role === "ADMIN" && <Link to="/users">{t.users}</Link>}
                {role === "HR" && <Link to="/bonds">{t.bonds}</Link>}
                {role === "MANAGER" && (
                    <>
                        <Link to="/approvals">{t.approvals}</Link>
                        <Link to="/bond-list">{t.bondList}</Link>
                    </>
                )}
                {role === "AUDITOR" && <Link to="/reports">{t.reports}</Link>}
            </nav>

            <button className="logout-btn" onClick={handleLogout}>
                {t.logout}
            </button>

            {/* 📄 FOOTER */}
            <div className="sidebar-footer">
                {t.footer}
            </div>

        </div>
    );
}

export default Sidebar;