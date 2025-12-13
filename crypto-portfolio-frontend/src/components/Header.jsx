
/*import { useAuth } from "../context/AuthContext";
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
*/
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { token, logout } = useAuth();

  const styles = {
    header: {
      padding: "10px 30px",
      background: "linear-gradient(90deg, #1e3c72, #2a5298)", // vibrant gradient
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      borderBottom: "1px solid #154071",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    nav: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    },
    link: {
      color: "#e0e0e0",
      textDecoration: "none",
      transition: "all 0.2s",
    },
    linkHover: {
      color: "#fff",
      textDecoration: "underline",
    },
    button: {
      background: "#ff7f50", // coral accent
      border: "none",
      borderRadius: "4px",
      color: "#fff",
      padding: "5px 12px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    buttonHover: {
      background: "#ff6347", // darker coral on hover
    },
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link
          to="/"
          style={styles.link}
          onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
        >
          Dashboard
        </Link>
        <Link
          to="/add"
          style={styles.link}
          onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
        >
          Add Investment
        </Link>
        <Link
          to="/view"
          style={styles.link}
          onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
        >
          My Investments
        </Link>
        <Link
          to="/history"
          style={styles.link}
          onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
        >
          History
        </Link>
      </nav>

      <div>
        {token ? (
          <button
            style={styles.button}
            onClick={logout}
            onMouseOver={(e) => (e.currentTarget.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => (e.currentTarget.style.background = styles.button.background)}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={styles.link}
            onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
            onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

