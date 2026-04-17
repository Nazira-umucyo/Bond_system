import React, { useEffect, useState } from "react";
import "./ApprovalPage.css";

function ApprovalPage() {
  const [bonds, setBonds] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await fetch("http://localhost:8080/bonds");
      const data = await res.json();
      const pending = data.filter((b) => b.status === "PENDING");
      setBonds(pending);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(
      `http://localhost:8080/bonds/${id}/status?status=${status}`,
      { method: "PUT" }
    );
    fetchPending();
  };

  return (
    <div className="page">
      <h2 className="title">HR Bond Approvals</h2>

      {bonds.length === 0 ? (
        <p className="empty">No pending bonds</p>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Employee</th>
                <th>Training</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bonds.map((bond) => (
                <tr key={bond.id}>
                  <td>{bond.staffId}</td>

                  <td className="employee">
                    {bond.employee?.firstName} {bond.employee?.lastName}
                  </td>

                  <td>{bond.training}</td>
                  <td>{bond.cost} RWF</td>

                  <td>
                    <span className="status pending">
                      {bond.status}
                    </span>
                  </td>

                  <td className="actions">
                    <button
                      className="btn approve"
                      onClick={() => updateStatus(bond.id, "ACTIVE")}
                    >
                      Approve
                    </button>

                    <button
                      className="btn reject"
                      onClick={() => updateStatus(bond.id, "BREACHED")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ApprovalPage;