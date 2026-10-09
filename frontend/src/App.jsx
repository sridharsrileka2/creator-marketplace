import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";
import Jobs from "./pages/Jobs";
import MyJobs from "./pages/MyJobs";
import MyProjects from "./pages/MyProjects";

function Home() {
  return (
    <div className="container py-5 text-center">
      <h1 className="fw-bold">Creator Marketplace</h1>

      <p className="text-muted">
        Hire creative professionals for your projects.
      </p>

      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-2">
          Login
        </Link>

        <Link to="/register" className="btn btn-outline-primary">
          Register
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

