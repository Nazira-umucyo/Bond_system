import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/Api";
import "./DashboardPage.css";

function DashboardPage() {
  const [bonds, setBonds] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBonds();
  }, []);

  const fetchBonds = async () => {
    try {
      const response = await api.get("/bonds");
      setBonds(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching bonds:", error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("username");

    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const filteredBonds = bonds.filter((bond) =>
      (bond.employeeFullName || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalBonds = bonds.length;
  const pendingBonds = bonds.filter((b) => b.status === "PENDING").length;
  const activeBonds = bonds.filter((b) => b.status === "ACTIVE").length;
  const completedBonds = bonds.filter((b) => b.status === "COMPLETED").length;
  const breachedBonds = bonds.filter((b) => b.status === "BREACHED").length;


  const totalInvestment = bonds.reduce(
      (sum, b) => sum + (b.cost || 0),
      0
  );

  const totalValue = bonds.reduce((sum, bond) => {
    const cost = bond.cost || 0;
    const duration = bond.duration || 0;

    if (bond.status === "COMPLETED") {
      return sum + cost;
    }

    if (!bond.startDate || duration === 0) {
      return sum;
    }

    const start = new Date(bond.startDate);
    const now = new Date();

    const yearsPassed =
        (now - start) / (1000 * 60 * 60 * 24 * 365);

    const progress = Math.min(yearsPassed / duration, 1);

    return sum + cost * progress;
  }, 0);

  const totalExposure = bonds
      .filter((b) => b.status === "BREACHED")
      .reduce((sum, b) => sum + (b.exposure || 0), 0);

  return (
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>Bond Management Dashboard</h1>
        </div>


        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Bonds</h3>
            <p>{totalBonds}</p>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <p>{pendingBonds}</p>
          </div>

          <div className="card">
            <h3>Active</h3>
            <p>{activeBonds}</p>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <p>{completedBonds}</p>
          </div>

          <div className="card">
            <h3>Breached</h3>
            <p>{breachedBonds}</p>
          </div>

          <div className="card">
            <h3>Total Investment</h3>
            <p>{totalInvestment.toLocaleString()} RWF</p>
          </div>

          <div className="card">
            <h3>Total Value</h3>
            <p>{totalValue.toFixed(0)} RWF</p>
          </div>

          <div className="card">
            <h3>Total Exposure</h3>
            <p>{totalExposure.toLocaleString()} RWF</p>
          </div>


        </div>

        <div className="search-bar">
          <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="bond-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Training</th>
              <th>Duration</th>
              <th>Cost</th>
              <th>Exposure</th>
              <th>Status</th>
              <th>Document</th>
            </tr>
            </thead>

            <tbody>
            {filteredBonds.length > 0 ? (
                filteredBonds.map((bond) => {


                  console.log("FULL BOND OBJECT: ", bond);


                  let statusClass = "";

                  if (bond.status === "PENDING") statusClass = "status-pending";
                  if (bond.status === "ACTIVE") statusClass = "status-active";
                  if (bond.status === "COMPLETED") statusClass = "status-completed";
                  if (bond.status === "BREACHED") statusClass = "status-breached";

                  return (
                      <tr key={bond.id}>
                        <td>{bond.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {bond.employee?.firstName} {bond.employee?.lastName}
                          </div>
                          <div className="text-xs text-slate-500">
                            {bond.employee?.staffId || "No Staff ID"}
                          </div>
                        </td>
                        <td>{bond.training}</td>
                        <td>{bond.duration} yrs</td>
                        <td>{bond.cost || 0} RWF</td>
                        <td>
                          {bond.status === "BREACHED"
                              ? `${bond.exposure} RWF`
                              : "-"}
                        </td>
                        <td className={statusClass}>{bond.status}</td>
                        <td>{bond.documentName}</td>
                      </tr>
                  );
                })
            ) : (
                <tr>
                  <td colSpan="7">No bonds found</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

      </div>
  );
}

export default DashboardPage;