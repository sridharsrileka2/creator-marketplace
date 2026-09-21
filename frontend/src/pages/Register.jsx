import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");

  const handleRegister = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      password,
      role,
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "420px" }}>

        <h2 className="text-center mb-2">
          Creator Marketplace
        </h2>

        <h4 className="text-center mb-4">
          Create Account
        </h4>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Register as
            </label>

            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="CLIENT">Client</option>
              <option value="CREATOR">Creator</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary text-decoration-none"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;