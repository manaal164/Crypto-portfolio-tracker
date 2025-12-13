


import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification"; // ✅ import notification

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [notification, setNotification] = useState({ show: false, message: "", type: "error" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call login API
      const res = await loginUser({ email, password });

      // Access token from response
      const token = res.data?.token || res.token;
      if (!token) throw new Error("Invalid response from server");

      // Save token in context & localStorage
      setToken(token);
      localStorage.setItem("token", token);

      // Optional success notification
      setNotification({ show: true, message: "Login successful ✅", type: "success" });

      // Redirect after small delay to show notification
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      console.error(err);
      setNotification({
        show: true,
        message: err.response?.data?.message || err.message || "Invalid email or password ❌",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "360px",
      padding: "30px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      animation: "fadeSlide 0.7s ease",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "26px",
      color: "#1e3c72",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "15px",
    },
    btn: {
      width: "100%",
      padding: "12px",
      background: "#1e3c72",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "0.3s",
    },
    toggle: {
      marginTop: "15px",
      textAlign: "center",
      color: "#555",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
      `}</style>

      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        {/* Notification component */}
        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        />

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={styles.toggle} onClick={() => navigate("/register")}>
          Don’t have an account? <strong>Register</strong>
        </div>
      </div>
    </div>
  );
}





