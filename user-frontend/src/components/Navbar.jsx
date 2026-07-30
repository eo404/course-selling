import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ active }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <span className="brand">Coursely</span>
      <nav className="nav-links">
        <Link className={active === "courses" ? "active" : ""} to="/courses">
          Browse
        </Link>
        <Link className={active === "my-courses" ? "active" : ""} to="/my-courses">
          My courses
        </Link>
      </nav>
      <div className="topbar-actions">
        <span className="muted small">{user?.username}</span>
        <button className="ghost" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
