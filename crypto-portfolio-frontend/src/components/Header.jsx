import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { token, logout } = useAuth();

  const styles = {
    header: {
      padding: "12px 40px",
      background: "rgba(30,60,114,0.85)",
      backdropFilter: "blur(15px)",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "'Inter', sans-serif",
      fontSize: "15px",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
      borderBottom: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "12px 12px 12px 12px", 

    },
    nav: {
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
    },
    link: {
      color: "#d0d4de",
      textDecoration: "none",
      fontWeight: 500,
      position: "relative",
      transition: "all 0.3s ease",
    },
    linkHover: {
      color: "#fff",
      textShadow: "0 0 8px rgba(255,255,255,0.7)",
    },
    button: {
      background: "linear-gradient(135deg, #ff7f50, #ff6347)",
      border: "none",
      borderRadius: "50px",
      color: "#fff",
      padding: "8px 22px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(255,127,80,0.4)",
    },
    buttonHover: {
      background: "linear-gradient(135deg, #ff6347, #ff4500)",
      boxShadow: "0 6px 20px rgba(255,99,71,0.6)",
      transform: "scale(1.08)",
    },
  };

  const handleLinkHover = (e, hover) => {
    e.currentTarget.style.color = hover ? styles.linkHover.color : styles.link.color;
    e.currentTarget.style.textShadow = hover ? styles.linkHover.textShadow : "none";
    e.currentTarget.style.textDecoration = hover ? "underline" : "none";
  };

  const handleButtonHover = (e, hover) => {
    e.currentTarget.style.background = hover ? styles.buttonHover.background : styles.button.background;
    e.currentTarget.style.boxShadow = hover ? styles.buttonHover.boxShadow : styles.button.boxShadow;
    e.currentTarget.style.transform = hover ? styles.buttonHover.transform : "scale(1)";
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {["Dashboard", "Add Investment", "My Investments", "History"].map((text, idx) => {
          const path =
            text === "Dashboard"
              ? "/"
              : text === "Add Investment"
                ? "/add"
                : text === "My Investments"
                  ? "/view"
                  : "/history";
          return (
            <Link
              key={idx}
              to={path}
              style={styles.link}
              onMouseOver={(e) => handleLinkHover(e, true)}
              onMouseOut={(e) => handleLinkHover(e, false)}
            >
              {text}
            </Link>
          );
        })}
      </nav>

      <div>
        {token ? (
          <button
            style={styles.button}
            onClick={logout}
            onMouseOver={(e) => handleButtonHover(e, true)}
            onMouseOut={(e) => handleButtonHover(e, false)}
          >
            Logout 🔒
          </button>
        ) : (
          <Link
            to="/login"
            style={styles.link}
            onMouseOver={(e) => handleLinkHover(e, true)}
            onMouseOut={(e) => handleLinkHover(e, false)}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
