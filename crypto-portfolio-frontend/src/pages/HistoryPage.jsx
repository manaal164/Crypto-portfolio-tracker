import { useEffect, useState } from "react";
import { getHistory } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";

export default function HistoryPage() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getHistory(token);
      setHistory(res.data);
    }
    load();
  }, []);

  return (
    <div style={{ margin: "40px" }}>
      <h2>History</h2>

      {history.map((h) => (
        <div key={h._id}
          style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>

          <p><b>Action:</b> {h.action}</p>
          <p><b>Date:</b> {new Date(h.timestamp).toLocaleString()}</p>

          {h.action === "UPDATE" && (
            <>
              <p>Old → {JSON.stringify(h.oldData)}</p>
              <p>New → {JSON.stringify(h.newData)}</p>
            </>
          )}

          {h.action === "ADD" && (
            <p>Added → {JSON.stringify(h.newData)}</p>
          )}

          {h.action === "DELETE" && (
            <p>Deleted → {JSON.stringify(h.oldData)}</p>
          )}
        </div>
      ))}
    </div>
  );
}
