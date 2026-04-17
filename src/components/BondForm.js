import { useState, useEffect } from "react";
import api from "../utils/Api";
import "./BondForm.css";

function BondForm() {
    const [trainings, setTrainings] = useState([]);

    const [staffId, setStaffId] = useState("");
    const [trainingId, setTrainingId] = useState("");
    const [duration, setDuration] = useState("");
    const [file, setFile] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await api.get("/employees");
                setEmployees(res.data);
            } catch (error) {
                console.error("ERROR fetching employees:", error);
                setEmployees([]);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const res = await api.get("/trainings");
                setTrainings(res.data);
            } catch (error) {
                console.error("ERROR fetching trainings:", error);
                setTrainings([]);
            }
        };

        fetchTrainings();
    }, []);

    const selectedTraining = trainings.find(
        (t) => String(t.id) === String(trainingId)
    );

    const handleSubmit = async () => {
        if (!staffId || !trainingId || !duration || !file) {
            alert("Please fill all fields");
            return;
        }

        if (!selectedTraining) {
            alert("Please select a valid training");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await api.post("/bonds/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const fileName = uploadRes.data;

            if (fileName === "upload failed") {
                alert("File upload failed ❌");
                return;
            }

            const selected = trainings.find(t => String(t.id) === String(trainingId));

            const cost = Number(selected?.trainingCost);

            if (!selected || !cost) {
                alert("Training not loaded properly ❌");
                return;
            }

            const bond = {
                staffId: staffId,
                training: selectedTraining.trainingName,
                cost: cost,
                duration: Number(duration),
                startDate: new Date().toISOString().split("T")[0],
                status: "PENDING",
                documentName: fileName,
            };

            console.log("trainingId:", trainingId);
            console.log("SELECTED TRAINING:", selectedTraining);
            console.log("RAW trainingCost:", selectedTraining?.trainingCost);
            console.log("FINAL COST SENT:", cost);
            console.log("SENDING BOND:", bond);

            const response = await api.post("/bonds", bond);

            if (!response.data) {
                alert("Failed to create bond ❌");
                return;
            }

            alert("Bond created successfully ✅");

            setStaffId("");
            setTrainingId("");
            setDuration("");
            setFile(null);

        } catch (error) {
            console.error("ERROR:", error);
            alert("Something went wrong ❌");
        }
    };

    return (
        <div className="bond-form">
            <h2>Register New Bond</h2>

            <div className="form-group">
                <label>Select Staff ID</label>
                <select
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                >
                    <option value="">-- Select Staff ID --</option>
                    {employees.map((emp) => (
                        <option key={emp.id} value={emp.staffId}>
                            {emp.staffId}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Select Training</label>
                <select
                    value={trainingId}
                    onChange={(e) => setTrainingId(e.target.value)}
                >
                    <option value="">-- Select Training --</option>
                    {trainings.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.trainingName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedTraining && (
                <div className="training-details">
                    <p><strong>Name:</strong> {selectedTraining.trainingName}</p>
                    <p><strong>Cost:</strong> {selectedTraining.trainingCost} RWF</p>
                </div>
            )}

            <div className="form-group">
                <label>Duration (Years)</label>
                <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0) {
                            setDuration(value);
                        }
                    }}
                    placeholder="Enter duration"
                />
            </div>

            <div className="form-group">
                <label>Upload Document</label>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
                Create Bond
            </button>
        </div>
    );
}

export default BondForm;