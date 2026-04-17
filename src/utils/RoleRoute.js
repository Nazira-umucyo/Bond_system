import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // logged in but wrong role
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;