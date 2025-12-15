import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";
import dashboardVideo from "../assets/dashboardani.mp4";
import eyeOpen from "../assets/eyeopen.svg";
import eyeClosed from "../assets/closedeyes.svg";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  const styles = {
    page: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
      color: "#fff",
      overflow: "hidden",
    },
    video: {
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -2,
    },
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: -1,
    },
    card: {
      width: "360px",
      padding: "35px 58px 35px 35px",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(14px)",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      animation: "fadeSlide 0.7s ease",
      zIndex: 10,
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "700",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      fontSize: "15px",
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      outline: "none",
      marginBottom: "12px",
    },
    passwordWrapper: {
      position: "relative",
      marginBottom: "12px",
    },
    eye: {
      position: "absolute",
      right: "12px",
      top: "46%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      width: "20px",
      height: "20px",
      opacity: 0.85,
    },
    btn: {
      width: "100%",
      padding: "12px",
      background: "#2196F3",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.3s",
      marginTop: "5px",

    },
    toggle: {
      marginTop: "15px",
      textAlign: "center",
      color: "#e0e0e0",
      cursor: "pointer",
      fontSize: "14px",
    },
    notification: (type) => ({
      position: "absolute",
      top: "-50px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "10px 18px",
      borderRadius: "6px",
      fontSize: "14px",
      color: "white",
      background: type === "success" ? "#28a745" : "#dc3545",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      animation: "slideDown 0.4s ease",
    }),
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification({ show: true, message: "Password do not match ❌", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      if (
        res.data.message?.toLowerCase().includes("verification") ||
        res.data.message?.toLowerCase().includes("otp")
      ) {
        setNotification({ show: true, message: "OTP sent! Check your email ✅", type: "success" });
        navigate("/otp", { state: { email } });
      } else {
        setNotification({ show: true, message: res.data.message || "Registration failed ❌", type: "error" });
      }
    } catch (err) {
      setNotification({ show: true, message: err.response?.data?.message || "Something went wrong ❌", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <video src={dashboardVideo} autoPlay loop muted playsInline style={styles.video} />
      <div style={styles.overlay} />

      <style>{`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input::placeholder { color: rgba(255,255,255,0.7); }
          button:hover { opacity: 0.9; transform: scale(1.03); }
        `}</style>

      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>

        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false, message: "" })}
        />

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />

          <div style={{ ...styles.passwordWrapper, marginBottom: 5 }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ ...styles.input, marginBottom: 7 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span style={styles.eye} onClick={() => setShowPassword(!showPassword)}>
              <img src={showPassword ? eyeOpen : eyeClosed} alt="eye toggle" style={{ width: "20px", height: "20px" }} />
            </span>
          </div>

          <div style={{ ...styles.passwordWrapper, marginBottom: 12 }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              style={{ ...styles.input, marginBottom: 0 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span style={styles.eye} onClick={() => setShowConfirm(!showConfirm)}>
              <img src={showConfirm ? eyeOpen : eyeClosed} alt="eye toggle" style={{ width: "20px", height: "20px" }} />
            </span>
          </div>

          <button type="submit"
            style={{
              ...styles.btn,
              width: "90%",          // full width ki jagah 90% kar diya
              padding: "12px",       // horizontal padding simple rakh liya
              textAlign: "center",
              whiteSpace: "nowrap",
              marginLeft: "auto",    // left se gap create karne ke liye
              marginRight: "auto",   // center align
              display: "block",      // margin auto work kare
            }}
            disabled={loading}>
            {loading ? "Sending OTP..." : "Register"}
          </button>
        </form>

        <div style={styles.toggle} onClick={() => navigate("/login")}>
          Already have an account? <strong>Login</strong>
        </div>
      </div>
    </div>
  );
}
