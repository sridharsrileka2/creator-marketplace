import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("Loading your projects...");
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessageType("warning");
        setMessage("Please login to view your projects.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/projects/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        const projectList = Array.isArray(data) ? data : [];

        setProjects(projectList);
        setMessage(
          projectList.length === 0
            ? "No projects found yet."
            : ""
        );
      } catch (error) {
        console.error("Fetch projects error:", error);

        setMessageType("danger");
        setMessage(
          error.response
            ? `Failed to load projects. HTTP ${error.response.status}.`
            : "Cannot connect to backend. Check whether Spring Boot is running."
        );
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="fw-bold mb-4">My Projects</h2>

        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}

        <div className="row g-4">
          {projects.map((project, index) => (
            <div
              className="col-md-6 col-lg-4"
              key={project.projectId ?? project.id ?? index}
            >
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    {project.title ??
                      project.projectName ??
                      "Untitled Project"}
                  </h5>

                  <p className="card-text">
                    {project.description ?? "No description provided."}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {project.status ?? "Not specified"}
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

export default MyProjects;

