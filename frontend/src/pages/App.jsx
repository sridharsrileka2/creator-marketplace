import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <div className="container py-5 text-center">

      <h1 className="fw-bold">
        Creator Marketplace
      </h1>

      <p className="text-muted">
        Hire creative professionals for your projects.
      </p>

      <div className="mt-4">

        <a
          href="/login"
          className="btn btn-primary me-2"
        >
          Login
        </a>

        <a
          href="/register"
          className="btn btn-outline-primary"
        >
          Register
        </a>

      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;