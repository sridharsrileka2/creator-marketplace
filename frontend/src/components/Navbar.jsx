import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          Creator Marketplace
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/login">
            Login
          </Link>

          <Link className="nav-link" to="/register">
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;