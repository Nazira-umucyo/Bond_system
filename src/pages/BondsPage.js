import BondForm from "../components/BondForm";
import "./BondsPage.css";

function BondsPage() {
  return (
    <div className="bonds-container">
      <h1 className="page-title">Bonds Management</h1>

      <div className="card">
        <BondForm />
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
      </div>
    </div>
  );
}

export default BondsPage;