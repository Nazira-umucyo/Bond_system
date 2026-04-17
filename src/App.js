import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import BondsPage from "./pages/BondsPage";
import BondList from "./components/BondList";
import DashboardPage from "./pages/DashboardPage";
import ApprovalPage from "./pages/ApprovalPage";
import ReportsPage from "./pages/ReportsPage";


import Sidebar from "./components/Sidebar";
import RoleRoute from "./utils/RoleRoute";

function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {showSidebar && <Sidebar />}

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Routes>

          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <RoleRoute allowedRoles={["ADMIN", "HR", "MANAGER", "AUDITOR"]}>
                <DashboardPage />
              </RoleRoute>
            }
          />

          <Route
            path="/users"
            element={
              <RoleRoute allowedRoles={["ADMIN"]}>
                <UsersPage />
              </RoleRoute>
            }
          />

          <Route
            path="/bonds"
            element={
              <RoleRoute allowedRoles={["HR"]}>
                <BondsPage />
              </RoleRoute>
            }
          />

          <Route
            path="/approvals"
            element={
              <RoleRoute allowedRoles={["MANAGER"]}>
                <ApprovalPage />
              </RoleRoute>
            }
          />

          <Route
            path="/bond-list"
            element={
              <RoleRoute allowedRoles={["MANAGER"]}>
                <BondList />
              </RoleRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <RoleRoute allowedRoles={["AUDITOR"]}>
                <ReportsPage />
              </RoleRoute>
            }
          />

        </Routes>
      </div>

    </div>
  );
}
export default App;