import { useEffect, useState } from "react";
import { getHistory } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";
import historyVideo from "../assets/historyani.mp4";

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

  const actionColors = {
    ADD: "#2ecc71",
    UPDATE: "#3498db",
    DELETE: "#e74c3c",
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        color: "#fff",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 🎥 Background Video */}
      <video
        src={historyVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      />

      {/* 🌑 Dark Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.65)",
          zIndex: -1,
        }}
      />

      {/* 📜 Content */}
      <div style={{ padding: "50px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "40px",
            textShadow: "0 4px 15px rgba(0,0,0,0.9)",
          }}
        >
          📜 Activity History
        </h2>

        {history.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.8 }}>
            No activity recorded yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {history.map((h) => (
              <div
                key={h._id}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "18px",
                  padding: "25px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.35)";
                }}
              >
                {/* 🔔 Action Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: actionColors[h.action] || "#fff",
                    }}
                  >
                    {h.action}
                  </span>

                  <span style={{ fontSize: "14px", opacity: 0.85 }}>
                    {new Date(h.timestamp).toLocaleString()}
                  </span>
                </div>

                {/* 📦 Data */}
                {h.action === "UPDATE" && (
                  <>
                    <DataBox title="Old Data" data={h.oldData} />
                    <DataBox title="New Data" data={h.newData} />
                  </>
                )}

                {h.action === "ADD" && (
                  <DataBox title="Added Data" data={h.newData} />
                )}

                {h.action === "DELETE" && (
                  <DataBox title="Deleted Data" data={h.oldData} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DataBox({ title, data }) {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.4)",
        borderRadius: "12px",
        padding: "15px",
        marginTop: "12px",
        fontFamily: "monospace",
        fontSize: "14px",
        whiteSpace: "pre-wrap",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>{title}</div>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
