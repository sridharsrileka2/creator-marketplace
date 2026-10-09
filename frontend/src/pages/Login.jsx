
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { email, password }
      );

      const token =
        typeof response.data === "string"
          ? response.data
          : response.data.token;

      if (!token) {
        setMessage("Login response-la token kidaikkala.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage("Invalid email or password.");
        } else {
          setMessage(`Login failed (${error.response.status}).`);
        }
      } else {
        setMessage(
          "Backend connection failed. Check whether Spring Boot is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-2">Creator Marketplace</h2>
        <h4 className="text-center mb-4">Login</h4>

        {message && (
          <div className="alert alert-info" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;