import { Link } from "react-router-dom";

export default function Footer() {
  const styles = {
    footer: {
      marginTop: "40px",
      padding: "20px 40px",
      textAlign: "center",
      background: "rgba(30,60,114,0.9)",
      backdropFilter: "blur(15px)",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      fontSize: "14px",
      borderRadius: "12px 12px 12px 12px",
      boxShadow: "0 -6px 25px rgba(0,0,0,0.35)",
      position: "relative",
      zIndex: 100,
    },
    links: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "25px",
      marginBottom: "12px",
    },
    link: {
      color: "#c0c4d1",
      textDecoration: "none",
      fontWeight: 500,
      transition: "all 0.3s ease",
      position: "relative",
    },
    linkHover: {
      color: "#fff",
      textShadow: "0 0 6px rgba(255,255,255,0.7)",
      textDecoration: "underline",
    },
    copyText: {
      fontSize: "13px",
      color: "#d0d4de",
      margin: 0,
    },
  };

  const handleLinkHover = (e, hover) => {
    e.currentTarget.style.color = hover ? styles.linkHover.color : styles.link.color;
    e.currentTarget.style.textShadow = hover ? styles.linkHover.textShadow : "none";
    e.currentTarget.style.textDecoration = hover ? styles.linkHover.textDecoration : "none";
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.links}>
        {["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"].map((text, idx) => {
          const path =
            text === "About Us"
              ? "/about"
              : text === "Contact Us"
              ? "/contact"
              : text === "Privacy Policy"
              ? "/privacy"
              : "/terms";
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
      </div>
      <p style={styles.copyText}>© 2025 Crypto Portfolio Tracker. All rights reserved.</p>
    </footer>
  );
}
