import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";
import dashboardVideo from "../assets/dashboardani.mp4";

export default function OtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const styles = {
    page: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
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
      marginBottom: "10px",
      fontSize: "26px",
      fontWeight: "700",
    },
    subtitle: {
      textAlign: "center",
      fontSize: "14px",
      marginBottom: "20px",
      color: "#e0e0e0",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      fontSize: "16px",
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      outline: "none",
      marginBottom: "14px",
      textAlign: "center",
      letterSpacing: "4px",
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
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify",
        {
          email,
          code: otp,
        }
      );

      if (res.data.message?.toLowerCase().includes("verified")) {
        setNotification({
          show: true,
          message: "Account verified successfully 🎉",
          type: "success",
        });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        handleFailedAttempt(res.data.message || "Invalid OTP ❌");
      }
    } catch (err) {
      handleFailedAttempt(
        err.response?.data?.message || "Invalid OTP ❌"
      );
    } finally {
      setLoading(false);
      setOtp("");
    }
  };

  const handleFailedAttempt = (msg) => {
    setNotification({ show: true, message: msg, type: "error" });
    setAttempts((prev) => prev + 1);

    if (attempts + 1 >= 3) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div style={styles.page}>
      <video
        src={dashboardVideo}
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      />
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
        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={() =>
            setNotification({ ...notification, show: false, message: "" })
          }
        />

        <h2 style={styles.title}>Verify OTP 🔐</h2>
        <p style={styles.subtitle}>
          OTP sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            style={styles.input}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" style={{
            ...styles.btn,
            width: "90%",          // full width ki jagah 90% kar diya
            padding: "12px",       // horizontal padding simple rakh liya
            textAlign: "center",
            whiteSpace: "nowrap",
            marginLeft: "auto",    // left se gap create karne ke liye
            marginRight: "auto",   // center align
            display: "block",      // margin auto work kare
          }} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
