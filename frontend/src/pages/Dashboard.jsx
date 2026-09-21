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

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">

                <h4 className="card-title">
                  Post a Job
                </h4>

                <p className="text-muted">
                  Create a project and find the right creator.
                </p>

                <button className="btn btn-primary">
                  Create Job
                </button>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">

                <h4 className="card-title">
                  Find Jobs
                </h4>

                <p className="text-muted">
                  Explore available creative opportunities.
                </p>

                <button className="btn btn-success">
                  View Jobs
                </button>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">

                <h4 className="card-title">
                  My Projects
                </h4>

                <p className="text-muted">
                  Manage your ongoing and completed projects.
                </p>

                <button className="btn btn-dark">
                  View Projects
                </button>

              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;