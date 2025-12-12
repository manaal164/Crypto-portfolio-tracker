import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // get email from register page

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #2a5298, #1e3c72)",
      fontFamily: "Arial, sans-serif",
      padding: "15px",
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
      padding: "12px",
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
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Correct backend route and field
      const res = await axios.post("http://localhost:5000/api/auth/verify", {
        email,
        code: otp, // backend expects 'code'
      });

      console.log("OTP verify response:", res.data);

      // ✅ Check backend response
      if (res.data.message?.toLowerCase().includes("verified")) {
        alert("Account verified successfully!");
        navigate("/login"); // redirect to login
      } else {
        alert(res.data.message || "Invalid OTP");
        setAttempts((prev) => prev + 1);

        if (attempts + 1 >= 3) {
          alert("Maximum attempts reached. Redirecting to login...");
          navigate("/login");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
      setAttempts((prev) => prev + 1);

      if (attempts + 1 >= 3) {
        alert("Maximum attempts reached. Redirecting to login...");
        navigate("/login");
      }
    } finally {
      setLoading(false);
      setOtp(""); // reset OTP input
    }
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
        <h2 style={styles.title}>Verify OTP 🔐</h2>
        <p style={{ textAlign: "center", marginBottom: "15px" }}>
          Enter the OTP sent to <strong>{email}</strong>
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
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
