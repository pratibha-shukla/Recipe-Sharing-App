
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-semibold" to="/">
        🍲 Recipe App
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
        aria-controls="nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav ms-auto align-items-lg-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/recipes">
              Recipes
            </Link>
          </li>

          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create Recipe
              </Link>
            </li>
          )}

          {!user ? (
            <li className="nav-item">
              <Link className="btn btn-outline-light btn-sm ms-lg-3" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm ms-lg-2" to="/register">
                Register
              </Link>
            </li>
          ) : (
            <li className="nav-item ms-lg-3">
              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}


