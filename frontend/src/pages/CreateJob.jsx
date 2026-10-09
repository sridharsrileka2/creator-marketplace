
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setMessageType("danger");
      setMessage("Please login first. Your login token was not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/jobs",
        {
          title: title.trim(),
          description: description.trim(),
          requiredSkills: requiredSkills.trim(),
          budget: budget ? Number(budget) : null,
          deadline: deadline
            ? `${deadline}T00:00:00`
            : null,
          status: "OPEN",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Job creation response:", response.data);

      setMessageType("success");
      setMessage("Job created successfully! Your job has been submitted.");

      setTitle("");
      setDescription("");
      setRequiredSkills("");
      setBudget("");
      setDeadline("");

    } catch (error) {
      console.error("Create job error:", error);

      setMessageType("danger");

      if (error.response) {
        const status = error.response.status;
        const details =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);

        setMessage(
          `Job creation failed. HTTP ${status}. ${details}`
        );
      } else if (error.request) {
        setMessage(
          "Cannot connect to backend. Check whether Spring Boot is running on port 8080."
        );
      } else {
        setMessage(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div
          className="card shadow p-4 mx-auto"
          style={{ maxWidth: "650px" }}
        >
          <h2 className="text-center mb-4">Create a Job</h2>

          {message && (
            <div
              className={`alert alert-${messageType}`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Video Editor Required"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Describe the work required"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Required Skills</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Video Editing, Premiere Pro"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Budget (₹)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Deadline</label>
              <input
                type="date"
                className="form-control"
                min={new Date().toLocaleDateString("en-CA")}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Job"}
            </button>

            <Link
              to="/dashboard"
              className="btn btn-outline-secondary w-100 mt-2"
            >
              Back to Dashboard
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateJob;