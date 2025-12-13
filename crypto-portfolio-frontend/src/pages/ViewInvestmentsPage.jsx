/*
import { useEffect, useState } from "react";
import { getPortfolio, deleteInvestment, updateInvestment } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";

export default function ViewInvestmentsPage() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");
  const [editBuyPrice, setEditBuyPrice] = useState("");
  const [editNote, setEditNote] = useState("");

  // Load portfolio
  const load = async () => {
    if (!token) return;
    try {
      const res = await getPortfolio(token);
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load portfolio");
    }
  };

  useEffect(() => {
    load();
  }, [token]);

  // Delete investment
  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this investment?")) return;
    try {
      await deleteInvestment(id, token);
      load();
    } catch {
      alert("Delete error");
    }
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditQuantity(item.quantity);
    setEditBuyPrice(item.buyPrice);
    setEditNote(item.note || "");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Submit update
  const submitUpdate = async (id) => {
    if (!editQuantity || !editBuyPrice) {
      alert("Quantity and Buy Price required");
      return;
    }
    try {
      await updateInvestment(id, { quantity: editQuantity, buyPrice: editBuyPrice, note: editNote }, token);
      setEditingId(null);
      load();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const styles = {
    page: { padding: "40px", fontFamily: "Arial, sans-serif", background: "#f0f4f8", minHeight: "100vh" },
    title: { color: "#1e3c72", marginBottom: "25px", fontSize: "28px", fontWeight: "bold" },
    grid: { display: "flex", flexWrap: "wrap", gap: "20px" },
    card: { flex: "1 1 250px", minWidth: "250px", background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" },
    cardHover: { transform: "translateY(-5px)", boxShadow: "0 12px 25px rgba(0,0,0,0.15)" },
    coinName: { marginBottom: "10px", fontSize: "20px", fontWeight: "bold", color: "#34495e" },
    text: { margin: "5px 0", color: "#555" },
    input: { width: "100%", padding: "8px", margin: "5px 0", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" },
    btn: { marginTop: "10px", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    deleteBtn: { background: "#e74c3c", color: "#fff", border: "none" },
    updateBtn: { background: "#2980b9", color: "#fff", border: "none", marginLeft: "10px" },
    saveBtn: { background: "#27ae60", color: "#fff", border: "none", marginTop: "10px", width: "100%" },
    cancelBtn: { background: "#95a5a6", color: "#fff", border: "none", marginTop: "5px", width: "100%" },
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📌 My Investments</h2>

      {items.length === 0 ? (
        <p style={{ color: "#888" }}>No investments found.</p>
      ) : (
        <div style={styles.grid}>
          {items.map((i) => (
            <div
              key={i._id}
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: "none", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" })}
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
                    <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => remove(i._id)}>Delete</button>
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
  */
 import { useEffect, useState } from "react";
import { getPortfolio, deleteInvestment, updateInvestment } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";
import Notification from "../components/Notification"; // ✅ notification

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

  useEffect(() => {
    load();
  }, [token]);

  // Show confirmation bar for delete
  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id, message: "Are you sure you want to delete this investment?" });
  };

  // Confirm delete action
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

  // Cancel delete action
  const cancelDeleteAction = () => {
    setConfirmDelete({ show: false, id: null, message: "" });
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditQuantity(item.quantity);
    setEditBuyPrice(item.buyPrice);
    setEditNote(item.note || "");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Submit update
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
    } catch (err) {
      console.error(err);
      setNotification({ show: true, message: "Update failed ❌", type: "error" });
    }
  };

  const styles = {
    page: { padding: "40px", fontFamily: "Arial, sans-serif", background: "#f0f4f8", minHeight: "100vh" },
    title: { color: "#1e3c72", marginBottom: "25px", fontSize: "28px", fontWeight: "bold" },
    grid: { display: "flex", flexWrap: "wrap", gap: "20px" },
    card: { flex: "1 1 250px", minWidth: "250px", background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" },
    cardHover: { transform: "translateY(-5px)", boxShadow: "0 12px 25px rgba(0,0,0,0.15)" },
    coinName: { marginBottom: "10px", fontSize: "20px", fontWeight: "bold", color: "#34495e" },
    text: { margin: "5px 0", color: "#555" },
    input: { width: "100%", padding: "8px", margin: "5px 0", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" },
    btn: { marginTop: "10px", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    deleteBtn: { background: "#e74c3c", color: "#fff", border: "none" },
    updateBtn: { background: "#2980b9", color: "#fff", border: "none", marginLeft: "10px" },
    saveBtn: { background: "#27ae60", color: "#fff", border: "none", marginTop: "10px", width: "100%" },
    cancelBtn: { background: "#95a5a6", color: "#fff", border: "none", marginTop: "5px", width: "100%" },
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📌 My Investments</h2>

      {/* Notification component */}
      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, show: false })}
      />

      {/* Confirmation bar for delete */}
      {confirmDelete.show && (
        <div style={{
          position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)",
          background: "#f39c12", color: "#fff", padding: "15px 25px", borderRadius: "8px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)", zIndex: 9999, display: "flex", gap: "15px", alignItems: "center"
        }}>
          <span>{confirmDelete.message}</span>
          <button style={{ background: "#27ae60", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
            onClick={() => confirmDeleteAction(confirmDelete.id)}>Yes</button>
          <button style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
            onClick={cancelDeleteAction}>No</button>
        </div>
      )}

      {items.length === 0 ? (
        <p style={{ color: "#888" }}>No investments found.</p>
      ) : (
        <div style={styles.grid}>
          {items.map((i) => (
            <div
              key={i._id}
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: "none", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" })}
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

