import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import dashboardVideo from "../assets/dashboardani.mp4";
import eyeOpen from "../assets/eyeopen.svg";      // Open eye image
import eyeClosed from "../assets/closedeyes.svg"; // Closed eye image

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "error",
  });

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      const token = res.data?.token || res.token;

      if (!token) throw new Error("Invalid response from server");

      setToken(token);
      localStorage.setItem("token", token);

      setNotification({
        show: true,
        message: "Login successful ✅",
        type: "success",
      });

      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      setNotification({
        show: true,
        message:
          err.response?.data?.message || err.message || "Invalid email or password ❌",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    page: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
      overflow: "hidden",
      color: "#fff",
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
    },
    passwordWrapper: {
      position: "relative",
      marginBottom: "12px",
    },
    eye: {
      position: "absolute",
      right: "12px",
      top: "50%",
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
  };

  return (
    <div style={styles.page}>
      {/* Background Video */}
      <video
        src={dashboardVideo}
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      />
      <div style={styles.overlay} />

      {/* Animations */}
      <style>
        {`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input::placeholder {
            color: rgba(255,255,255,0.7);
          }
          button:hover {
            opacity: 0.9;
            transform: scale(1.03);
          }
        `}
      </style>

      {/* Login Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false, message: "" })}
        />

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            style={{ ...styles.input, marginBottom: "12px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input with Eye Toggle */}
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ ...styles.input, paddingRight: "12px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              style={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? eyeOpen : eyeClosed}
                alt="eye toggle"
                style={{ width: "20px", height: "20px" }}
              />
            </span>
          </div>

          {/* Login Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              style={{
                ...styles.btn,
                width: "94%",       // fixed width
                padding: "12px 150px",    // horizontal padding remove
                textAlign: "center",  // text hamesha center
                whiteSpace: "nowrap", // text wrap nahi hoga
              }} disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

        </form>

        {/* Register Link */}
        <div
          style={styles.toggle}
          onClick={() => navigate("/register")}
        >
          Don’t have an account? <strong>Register</strong>
        </div>
      </div>
    </div>
  );
}
