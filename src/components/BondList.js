import { useEffect, useState } from "react";
import "./BondList.css";

function BondList() {
  const [bonds, setBonds] = useState([]);

  const fetchBonds = async () => {
    try {
      const res = await fetch("http://localhost:8080/bonds");
      const data = await res.json();
      console.log("Fetched bonds:", data);

      setBonds(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBonds();
  }, []);

  const updateStatus = async (id, status) => {
  try {
    const res = await fetch(
      `http://localhost:8080/bonds/${id}/status?status=${status}`,
      {
        method: "PUT",
      }
    );

    if (!res.ok) {
      alert("Something went wrong ❌");
      return;
    }

    if (status === "BREACHED") {
      alert("🚨 Bond breached! Email sent to HR.");
    }

    if (status === "COMPLETED") {
      alert("✅ Bond marked as completed.");
    }

    fetchBonds();

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
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