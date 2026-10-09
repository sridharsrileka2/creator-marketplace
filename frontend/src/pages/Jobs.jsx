import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("Loading jobs...");
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessageType("warning");
        setMessage("Please login to view available jobs.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/jobs/open",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        const jobList = Array.isArray(data)
          ? data
          : Array.isArray(data.content)
          ? data.content
          : Array.isArray(data.jobs)
          ? data.jobs
          : [];

        setJobs(jobList);

        if (jobList.length === 0) {
          setMessageType("info");
          setMessage("No open jobs found.");
        } else {
          setMessage("");
        }
      } catch (error) {
        console.error("Fetch jobs error:", error);

        setMessageType("danger");

        if (error.response) {
          setMessage(
            `Failed to load jobs. HTTP ${error.response.status}.`
          );
        } else {
          setMessage(
            "Cannot connect to backend. Check whether Spring Boot is running."
          );
        }
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Available Jobs</h2>

          <Link to="/create-job" className="btn btn-primary">
            + Create Job
          </Link>
        </div>

        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}

        <div className="row g-4">
          {jobs.map((job, index) => (
            <div className="col-md-6 col-lg-4" key={job.jobId ?? job.id ?? index}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    {job.title ?? "Untitled Job"}
                  </h5>

                  <p className="card-text">
                    {job.description ?? "No description provided."}
                  </p>

                  <p className="mb-2">
                    <strong>Required Skills:</strong>{" "}
                    {job.requiredSkills || "Not specified"}
                  </p>

                  <p className="mb-2">
                    <strong>Budget:</strong>{" "}
                    {job.budget != null
                      ? `₹${job.budget}`
                      : "Not specified"}
                  </p>

                  <p className="mb-0">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">
                      {job.status ?? "OPEN"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/dashboard"
          className="btn btn-outline-secondary mt-4"
        >
          Back to Dashboard
        </Link>
      </div>
    </>
  );
}

export default Jobs;