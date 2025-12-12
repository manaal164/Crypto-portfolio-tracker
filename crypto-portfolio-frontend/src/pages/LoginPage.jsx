// import { useState } from "react";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { setToken } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault(); // prevent page refresh
//     setLoading(true);

//     try {
//       const data = await loginUser({ email, password });
//       console.log("Login successful:", data);

//       setToken(data.token); // store JWT token
//       navigate("/dashboard"); // redirect
//     } catch (err) {
//       console.error("Login failed:", err);
//       alert(err.message || "Something went wrong, please try again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ margin: "50px", maxWidth: "400px" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      setToken(res.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Invalid email or password");
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
