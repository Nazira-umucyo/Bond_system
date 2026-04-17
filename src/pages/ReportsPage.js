import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./ReportsPage.css";

function ReportsPage() {
  const [bonds, setBonds] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");

  useEffect(() => {
    fetchBonds();
  }, []);

  const fetchBonds = async () => {
    try {
      const res = await axios.get("http://localhost:8080/bonds");
      setBonds(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching bonds:", error);
    }
  };

  const filtered = bonds
  .filter((b) =>
    statusFilter ? b.status === statusFilter : true
  )
  .filter((b) =>
    employeeFilter
      ? (
          (b.employee?.firstName || "") +
          " " +
          (b.employee?.lastName || "") +
          " " +
          (b.staffId || "")
        )
          .toLowerCase()
          .includes(employeeFilter.toLowerCase())
      : true
  )
  .filter((b) =>
    (
      (b.employee?.firstName || "") +
      " " +
      (b.employee?.lastName || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalBonds = filtered.length;

  const active = filtered.filter((b) => b.status === "ACTIVE").length;
  const completed = filtered.filter((b) => b.status === "COMPLETED").length;
  const breached = filtered.filter((b) => b.status === "BREACHED").length;
  const pending = filtered.filter((b) => b.status === "PENDING").length;

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

  const breachRate =
    totalBonds > 0 ? ((breached / totalBonds) * 100).toFixed(1) : 0;

  const exportToExcel = () => {
  const data = filtered.map((b) => ({
    Employee: `${b.employee?.firstName || ""} ${b.employee?.lastName || ""}`,
    StaffID: b.employee?.staffId || b.staffId,
    Training: b.training,
    Cost: b.cost,
    Exposure: b.status === "BREACHED" ? b.exposure : 0,
    Status: b.status,
    Duration: b.duration,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Bond Report");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "Bond_Report.xlsx");
};

  return (
    <div className="reports-container">

      <div id="report-content">

        <h1>Bond Performance Report</h1>

        <div className="filters">

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filter by employee (name or ID)"
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
          />

          <select
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="BREACHED">Breached</option>
            <option value="PENDING">Pending</option>
          </select>

        </div>

        <div className="kpis">
          <div>Total Bonds: {totalBonds}</div>
          <div>Active: {active}</div>
          <div>Completed: {completed}</div>
          <div>Breached: {breached}</div>
          <div>Pending: {pending}</div>
          <div>Total Investment: {totalInvestment} RWF</div>
          <div>Total Value: {totalValue} RWF</div>
          <div>Total Exposure: {totalExposure} RWF</div>
          <div>Breach Rate: {breachRate}%</div>
        </div>

        {employeeFilter && (
          <div className="financial">
            <h3>Employee Report</h3>

            <p>
              Employee:{" "}
              {filtered[0]?.employee ||
                filtered[0]?.staffId ||
                "Unknown"}
            </p>

            <p>Total Bonds: {filtered.length}</p>

            <p>
              Total Value:{" "}
              {filtered.reduce((s, b) => s + (b.cost || 0), 0)} RWF
            </p>

            <p>
              Total Exposure:{" "}
              {filtered.reduce(
                (s, b) => s + (b.exposure || 0),
                0
              )}{" "}
              RWF
            </p>
          </div>
        )}

        <div className="financial">
          <h3>Financial Summary</h3>
          <p>Total Investment: {totalInvestment} RWF</p>
          <p>Exposure: {totalExposure} RWF</p>
          <p>Total Value: {totalValue} RWF</p>
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Training</th>
              <th>Cost</th>
              <th>Exposure</th>
              <th>Status</th>
              <th>Duration</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((b) => (
                <tr key={b.id}>
                  <td>
                    {b.employee
                   ? `${b.employee.firstName} ${b.employee.lastName}`
                   : b.staffId || "-"}
                  </td>
                  <td>{b.training}</td>
                  <td>{b.cost ? `${b.cost} RWF` : "0 RWF"}</td>

                  <td>
                    {b.status === "BREACHED"
                      ? `${b.exposure || 0} RWF`
                      : "-"}
                  </td>

                  <td className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </td>

                  <td>{b.duration} yrs</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data found</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

      <button className="export-btn" onClick={exportToExcel}>
        Export Excel
        </button>

    </div>
  );
}

export default ReportsPage;