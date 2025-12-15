import { useState } from "react";

export default function CoinCard({ coin }) {
  const [scale, setScale] = useState(1);
  const isProfit = coin.pnl >= 0;

  return (
    <div
      style={{
        flex: "1 1 250px",
        minWidth: "250px",
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
        transition: "transform 0.2s",
        transform: `scale(${scale})`,
        cursor: "pointer",
        color: "#333",
        fontSize: "14px",
        lineHeight: "1.6",
        borderTop: `4px solid ${isProfit ? "#4CAF50" : "#f44336"}`,
      }}
      onMouseEnter={() => setScale(1.03)}
      onMouseLeave={() => setScale(1)}
    >
      <h4 style={{ marginBottom: "10px" }}>
        {coin.coin} ({coin.symbol})
      </h4>
      <div><b>Quantity:</b> {coin.quantity}</div>
      <div><b>Buy Price:</b> ${coin.buyPrice}</div>
      <div><b>Current Price:</b> ${coin.currentPrice}</div>
      <div><b>Invested:</b> ${coin.invested.toFixed(2)}</div>
      <div><b>Current:</b> ${coin.current.toFixed(2)}</div>
      <div><b>PnL:</b> ${coin.pnl.toFixed(2)} ({coin.pnlPercent.toFixed(2)}%)</div>
    </div>
  );
}
