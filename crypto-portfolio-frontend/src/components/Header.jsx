import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { token, logout } = useAuth();

  return (
    <header style={{ padding: "15px", background: "#111", color: "#fff" }}>
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>Dashboard</Link>
        <Link to="/add" style={{ color: "white" }}>Add Investment</Link>
        <Link to="/view" style={{ color: "white" }}>My Investments</Link>
        <Link to="/history" style={{ color: "white" }}>History</Link>

        {token ? (
          <button onClick={logout} style={{ marginLeft: "auto" }}>Logout</button>
        ) : (
          <Link to="/login" style={{ marginLeft: "auto", color: "white" }}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
