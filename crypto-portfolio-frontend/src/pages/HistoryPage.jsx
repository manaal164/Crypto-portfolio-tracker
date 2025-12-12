import { useEffect, useState } from "react";
import { getHistory } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";

export default function HistoryPage() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getHistory(token);
        setHistory(res.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load history");
      }
    }
    load();
  }, [token]);

  const styles = {
    page: { padding: "40px", fontFamily: "Arial, sans-serif", background: "#f4f6f8", minHeight: "100vh" },
    title: { fontSize: "28px", fontWeight: "bold", color: "#1e3c72", marginBottom: "25px" },
    grid: { display: "flex", flexDirection: "column", gap: "15px" },
    card: { background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
    action: { fontWeight: "bold" },
    add: { color: "#27ae60" },
    update: { color: "#2980b9" },
    delete: { color: "#e74c3c" },
    timestamp: { fontSize: "14px", color: "#555", marginBottom: "10px" },
    dataBox: { background: "#f0f0f0", padding: "10px", borderRadius: "8px", fontFamily: "monospace", whiteSpace: "pre-wrap" },
  };

  const getActionStyle = (action) => {
    switch (action) {
      case "ADD": return { ...styles.action, ...styles.add };
      case "UPDATE": return { ...styles.action, ...styles.update };
      case "DELETE": return { ...styles.action, ...styles.delete };
      default: return styles.action;
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📜 History</h2>

      {history.length === 0 ? (
        <p style={{ color: "#888" }}>No history found.</p>
      ) : (
        <div style={styles.grid}>
          {history.map((h) => (
            <div key={h._id} style={styles.card}>
              <div style={getActionStyle(h.action)}>Action: {h.action}</div>
              <div style={styles.timestamp}>Date: {new Date(h.timestamp).toLocaleString()}</div>

              {h.action === "UPDATE" && (
                <>
                  <div style={styles.dataBox}>Old: {JSON.stringify(h.oldData, null, 2)}</div>
                  <div style={styles.dataBox}>New: {JSON.stringify(h.newData, null, 2)}</div>
                </>
              )}

              {h.action === "ADD" && (
                <div style={styles.dataBox}>Added: {JSON.stringify(h.newData, null, 2)}</div>
              )}

              {h.action === "DELETE" && (
                <div style={styles.dataBox}>Deleted: {JSON.stringify(h.oldData, null, 2)}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
