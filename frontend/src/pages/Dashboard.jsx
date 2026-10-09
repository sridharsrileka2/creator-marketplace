import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            Welcome to Creator Marketplace
          </h1>

          <p className="text-muted">
            Connect clients with talented creators.
          </p>
        </div>

        <div className="row g-4">

          {/* Create Job */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center p-4">
                <h4 className="card-title mb-3">
                  Post a Job
                </h4>

                <p className="text-muted">
                  Create a job and find the right creator for your project.
                </p>

                <Link
                  to="/create-job"
                  className="btn btn-primary"
                >
                  Create Job
                </Link>
              </div>
            </div>
          </div>

          {/* View All Jobs */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center p-4">
                <h4 className="card-title mb-3">
                  Find Jobs
                </h4>

                <p className="text-muted">
                  Explore available creative opportunities.
                </p>

                <Link
                  to="/jobs"
                  className="btn btn-success"
                >
                  View Jobs
                </Link>
              </div>
            </div>
          </div>

          {/* My Jobs */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center p-4">
                <h4 className="card-title mb-3">
                  My Jobs
                </h4>

                <p className="text-muted">
                  View the jobs you have posted.
                </p>

                <Link
                  to="/my-jobs"
                  className="btn btn-dark"
                >
                  View My Jobs
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;