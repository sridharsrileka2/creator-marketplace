import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("Loading your jobs...");
  const [messageType, setMessageType] = useState("info");
  const [loading, setLoading] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("OPEN");

  const fetchMyJobs = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessageType("warning");
      setMessage("Please login to view your jobs.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/jobs/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const list = Array.isArray(response.data) ? response.data : [];
      setJobs(list);
      setMessage(list.length === 0 ? "You haven't posted any jobs yet." : "");
      setMessageType("info");
    } catch (error) {
      setMessageType("danger");
      setMessage(
        error.response
          ? `Failed to load jobs. HTTP ${error.response.status}.`
          : "Cannot connect to backend."
      );
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleEdit = (job) => {
    setEditingJobId(job.jobId ?? job.id);
    setTitle(job.title ?? "");
    setDescription(job.description ?? "");
    setRequiredSkills(job.requiredSkills ?? "");
    setBudget(job.budget ?? "");
    setDeadline(job.deadline ? String(job.deadline).substring(0, 10) : "");
    setStatus(job.status ?? "OPEN");
    setMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/jobs/${editingJobId}`,
        {
          title: title.trim(),
          description: description.trim(),
          requiredSkills: requiredSkills.trim(),
          budget: budget === "" ? null : Number(budget),
          deadline: deadline ? `${deadline}T00:00:00` : null,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditingJobId(null);
      setMessageType("success");
      setMessage("Job updated successfully!");
      await fetchMyJobs();
    } catch (error) {
      setMessageType("danger");
      setMessage(
        error.response
          ? `Update failed. HTTP ${error.response.status}.`
          : "Cannot connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (job) => {
    const jobId = job.jobId ?? job.id;

    if (!jobId) {
      setMessageType("danger");
      setMessage("Job ID not found.");
      return;
    }

    if (!window.confirm(`Delete "${job.title}"?`)) return;

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/api/jobs/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (editingJobId === jobId) setEditingJobId(null);

      setMessageType("success");
      setMessage("Job deleted successfully!");
      await fetchMyJobs();
    } catch (error) {
      setMessageType("danger");
      setMessage(
        error.response
          ? `Delete failed. HTTP ${error.response.status}.`
          : "Cannot connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">My Jobs</h2>
          <Link to="/create-job" className="btn btn-primary">
            + Create Job
          </Link>
        </div>

        {message && (
          <div className={`alert alert-${messageType}`}>
            {message}
          </div>
        )}

        {editingJobId !== null && (
          <div className="card shadow-sm p-4 mb-4">
            <h4>Edit Job</h4>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Required Skills</label>
                <input
                  className="form-control"
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Budget (₹)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-success me-2"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingJobId(null)}
                disabled={loading}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="row g-4">
          {jobs.map((job, index) => (
            <div
              className="col-md-6 col-lg-4"
              key={job.jobId ?? job.id ?? index}
            >
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{job.title}</h5>

                  <p>{job.description}</p>

                  <p>
                    <strong>Required Skills:</strong>{" "}
                    {job.requiredSkills || "Not specified"}
                  </p>

                  <p>
                    <strong>Budget:</strong>{" "}
                    {job.budget != null ? `₹${job.budget}` : "Not specified"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">
                      {job.status ?? "OPEN"}
                    </span>
                  </p>

                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(job)}
                    disabled={loading}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(job)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to="/dashboard" className="btn btn-outline-secondary mt-4">
          Back to Dashboard
        </Link>
      </div>
    </>
  );
}

export default MyJobs;
