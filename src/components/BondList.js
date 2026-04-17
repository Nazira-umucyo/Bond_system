import { useEffect, useState } from "react";
import api from "../utils/Api";
import "./BondList.css";

function BondList() {
  const [bonds, setBonds] = useState([]);

  const fetchBonds = async () => {
    try {
      const res = await api.get("/bonds");
      console.log("Fetched bonds:", res.data);
      setBonds(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBonds();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bonds/${id}/status?status=${status}`);

      if (status === "BREACHED") {
        alert("🚨 Bond breached! Email sent to HR.");
      }

      if (status === "COMPLETED") {
        alert("✅ Bond marked as completed.");
      }

      fetchBonds();

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
      <div className="bond-list">
        <h2>Bond List</h2>

        <table className="bond-table">
          <thead>
          <tr>
            <th>Staff ID</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Exposure</th>
            <th>Actions</th>
          </tr>
          </thead>

          <tbody>
          {bonds.map((bond) => (
              <tr key={bond.id}>
                <td>{bond.staffId || "-"}</td>

                <td>{bond.cost || 0} RWF</td>

                <td>
                <span className={`status ${bond.status}`}>
                  {bond.status}
                </span>
                </td>

                <td>
                  {bond.status === "BREACHED" ? (
                      <span className="exposure">
                    {bond.exposure} RWF
                  </span>
                  ) : (
                      "-"
                  )}
                </td>

                <td className="actions">
                  {bond.status === "ACTIVE" && (
                      <>
                        <button
                            className="btn complete"
                            onClick={() =>
                                updateStatus(bond.id, "COMPLETED")
                            }
                        >
                          Mark Completed
                        </button>

                        <button
                            className="btn breach"
                            onClick={() =>
                                updateStatus(bond.id, "BREACHED")
                            }
                        >
                          Mark Breached
                        </button>
                      </>
                  )}

                  {bond.status === "PENDING" && (
                      <span style={{ color: "orange" }}>
                    Awaiting approval
                  </span>
                  )}

                  {(bond.status === "COMPLETED" ||
                      bond.status === "BREACHED") && (
                      <span style={{ color: "gray" }}>
                    No actions
                  </span>
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default BondList;