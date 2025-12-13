
/*

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    toggle: {
      marginTop: "15px",
      textAlign: "center",
      color: "#555",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("Register response:", res.data);

      if (
        res.data.message?.toLowerCase().includes("verification") ||
        res.data.message?.toLowerCase().includes("otp")
      ) {
        navigate("/otp", { state: { email } });
      } else {
        alert(res.data.message || "Registration failed");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
        <h2 style={styles.title}>Create Account ✨</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            {loading ? "Sending OTP..." : "Register"}
          </button>
        </form>

        <div
          style={styles.toggle}
          onClick={() => navigate("/login")}
        >
          Already have an account? <strong>Login</strong>
        </div>
      </div>
    </div>
  );
}
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification"; // ✅ import notification

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" }); // ✅ notification state
  const navigate = useNavigate();

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
    toggle: {
      marginTop: "15px",
      textAlign: "center",
      color: "#555",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("Register response:", res.data);

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
        <h2 style={styles.title}>Create Account ✨</h2>

        {/* Notification */}
        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        />

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            {loading ? "Sending OTP..." : "Register"}
          </button>
        </form>

        <div
          style={styles.toggle}
          onClick={() => navigate("/login")}
        >
          Already have an account? <strong>Login</strong>
        </div>
      </div>
    </div>
  );
}
