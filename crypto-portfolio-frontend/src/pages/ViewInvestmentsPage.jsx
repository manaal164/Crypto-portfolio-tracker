import { useEffect, useState } from "react";
import { getPortfolio, deleteInvestment, updateInvestment } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";
import Notification from "../components/Notification";
import viewInvestVideo from "../assets/viewinvestani.mp4";

export default function ViewInvestmentsPage() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");
  const [editBuyPrice, setEditBuyPrice] = useState("");
  const [editNote, setEditNote] = useState("");
  
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null, message: "" });

  // Load portfolio
  const load = async () => {
    if (!token) return;
    try {
      const res = await getPortfolio(token);
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      setNotification({ show: true, message: "Failed to load portfolio ❌", type: "error" });
    }
  };

  useEffect(() => { load(); }, [token]);

  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id, message: "Are you sure you want to delete this investment?" });
  };

  const confirmDeleteAction = async (id) => {
    try {
      await deleteInvestment(id, token);
      setNotification({ show: true, message: "Investment deleted successfully ✅", type: "success" });
      load();
    } catch {
      setNotification({ show: true, message: "Delete error ❌", type: "error" });
    } finally {
      setConfirmDelete({ show: false, id: null, message: "" });
    }
  };

  const cancelDeleteAction = () => { setConfirmDelete({ show: false, id: null, message: "" }); };
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditQuantity(item.quantity);
    setEditBuyPrice(item.buyPrice);
    setEditNote(item.note || "");
  };
  const cancelEdit = () => setEditingId(null);

  const submitUpdate = async (id) => {
    if (!editQuantity || !editBuyPrice) {
      setNotification({ show: true, message: "Quantity and Buy Price required ❌", type: "error" });
      return;
    }
    try {
      await updateInvestment(id, { quantity: editQuantity, buyPrice: editBuyPrice, note: editNote }, token);
      setEditingId(null);
      setNotification({ show: true, message: "Investment updated successfully ✅", type: "success" });
      load();
    } catch {
      setNotification({ show: true, message: "Update failed ❌", type: "error" });
    }
  };

  const styles = {
    page: { position: "relative", padding: "40px", fontFamily: "Arial, sans-serif", minHeight: "100vh", overflow: "hidden" },
    video: { position: "fixed", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -2 },
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: -1 },
    title: { color: "#fff", marginBottom: "30px", fontSize: "28px", fontWeight: "bold", textAlign: "center" },
    grid: { display: "flex", flexWrap: "wrap", gap: "20px" },
    card: { flex: "1 1 250px", minWidth: "250px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(14px)", borderRadius: "16px", padding: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.35)", transition: "0.3s" },
    cardHover: { transform: "translateY(-5px)", boxShadow: "0 15px 30px rgba(0,0,0,0.4)" },
    coinName: { marginBottom: "10px", fontSize: "20px", fontWeight: "bold", color: "#fff" },
    text: { margin: "5px 0", color: "#f0f0f0" },
    input: { width: "100%", padding: "10px", margin: "5px 0", borderRadius: "8px", border: "none", background: "rgba(255,255,255,0.2)", color: "#fff", outline: "none" },
    btn: { marginTop: "10px", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", border: "none" },
    deleteBtn: { background: "#e74c3c", color: "#fff" },
    updateBtn: { background: "#2980b9", color: "#fff", marginLeft: "10px" },
    saveBtn: { background: "#27ae60", color: "#fff", marginTop: "10px", width: "100%" },
    cancelBtn: { background: "#95a5a6", color: "#fff", marginTop: "5px", width: "100%" },
    confirmBar: { position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "rgba(28, 55, 135, 0.95)", color: "#fff", padding: "15px 25px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)", zIndex: 9999, display: "flex", gap: "15px", alignItems: "center" }
  };

  return (
    <div style={styles.page}>
      <video src={viewInvestVideo} autoPlay loop muted playsInline style={styles.video} />
      <div style={styles.overlay} />

      <style>{`
        button:hover { opacity: 0.9; transform: scale(1.02); }
        input:focus { box-shadow: 0 0 8px rgba(30,60,114,0.5); }
      `}</style>

      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, show: false, message: ""  })}
      />

      {confirmDelete.show && (
        <div style={styles.confirmBar}>
          <span>{confirmDelete.message}</span>
          <button style={{ background: "#27ae60", color: "#fff", borderRadius: "8px", padding: "6px 12px" }} onClick={() => confirmDeleteAction(confirmDelete.id)}>Yes</button>
          <button style={{ background: "#e74c3c", color: "#fff", borderRadius: "8px", padding: "6px 12px" }} onClick={cancelDeleteAction}>No</button>
        </div>
      )}

      <h2 style={styles.title}>📌 My Investments</h2>

      {items.length === 0 ? (
        <p style={{ color: "#ccc", textAlign: "center" }}>No investments found.</p>
      ) : (
        <div style={styles.grid}>
          {items.map((i) => (
            <div
              key={i._id}
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.35)" })}
            >
              <div style={styles.coinName}>{i.coin} ({i.symbol})</div>

              {editingId === i._id ? (
                <>
                  <input style={styles.input} type="number" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} placeholder="Quantity" />
                  <input style={styles.input} type="number" value={editBuyPrice} onChange={(e) => setEditBuyPrice(e.target.value)} placeholder="Buy Price" />
                  <input style={styles.input} type="text" value={editNote} onChange={(e) => setEditNote(e.target.value)} placeholder="Note (optional)" />
                  <button style={{ ...styles.btn, ...styles.saveBtn }} onClick={() => submitUpdate(i._id)}>💾 Save</button>
                  <button style={{ ...styles.btn, ...styles.cancelBtn }} onClick={cancelEdit}>✖ Cancel</button>
                </>
              ) : (
                <>
                  <div style={styles.text}><b>Quantity:</b> {i.quantity}</div>
                  <div style={styles.text}><b>Buy Price:</b> ${i.buyPrice}</div>
                  {i.note && <div style={styles.text}><b>Note:</b> {i.note}</div>}
                  <div>
                    <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => handleDeleteClick(i._id)}>Delete</button>
                    <button style={{ ...styles.btn, ...styles.updateBtn }} onClick={() => startEdit(i)}>Update</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
