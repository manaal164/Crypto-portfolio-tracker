
// components/Notification.jsx
export default function Notification({ message, type, onClose }) {
  if (!message) return null;

  const bgColor = type === "success" ? "#27ae60" : "#e74c3c";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: bgColor,
        color: "white",
        padding: "15px 25px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 9999,
        minWidth: "250px",
        fontWeight: "bold",
        animation: "fadeIn 0.3s",
      }}
    >
      {message}
      <span
        onClick={onClose}
        style={{
          float: "right",
          marginLeft: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ×
      </span>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
