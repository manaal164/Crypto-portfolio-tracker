/*
import { useEffect, useState } from "react";
import { getAnalytics } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { token } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAnalytics(token);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [token]);

  if (!data) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading analytics...</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#1e3c72", marginBottom: "30px" }}>📊 Dashboard Analytics</h2>

   

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={cardStyle("#4CAF50")}>
          <h3>Total Investment</h3>
          <p>${data.totalInvestment.toFixed(2)}</p>
        </div>
        <div style={cardStyle("#2196F3")}>
          <h3>Current Value</h3>
          <p>${data.currentValue.toFixed(2)}</p>
        </div>
        <div style={cardStyle("#FF9800")}>
          <h3>Total PnL</h3>
          <p>${data.profitLoss.toFixed(2)}</p>
        </div>
        <div style={cardStyle("#f44336")}>
          <h3>PnL Percent</h3>
          <p>{data.profitLossPercent.toFixed(2)}%</p>
        </div>
      </div>

      <h3 style={{ marginTop: "50px", marginBottom: "20px", color: "#1e3c72" }}>💰 Coins Breakdown</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {data.coins.map((c) => (
          <div key={c.coin} style={coinCardStyle}>
            <h4>{c.coin} ({c.symbol})</h4>
            <p><b>Quantity:</b> {c.quantity}</p>
            <p><b>Buy Price:</b> ${c.buyPrice}</p>
            <p><b>Current Price:</b> ${c.currentPrice}</p>
            <p><b>Invested:</b> ${c.invested.toFixed(2)}</p>
            <p><b>Current:</b> ${c.current.toFixed(2)}</p>
            <p><b>PnL:</b> ${c.pnl.toFixed(2)} ({c.pnlPercent.toFixed(2)}%)</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Card style function
const cardStyle = (bgColor) => ({
  flex: "1 1 200px",
  minWidth: "200px",
  background: bgColor,
  color: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
  textAlign: "center",
  transition: "transform 0.3s",
  cursor: "default",
  fontWeight: "bold",
  fontSize: "18px",
  hover: { transform: "scale(1.05)" },
});

// Coin card style
const coinCardStyle = {
  flex: "1 1 250px",
  minWidth: "250px",
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
  transition: "transform 0.3s",
  cursor: "pointer",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#333",
  hover: { transform: "scale(1.03)" },
};
*/

import { useEffect, useState } from "react";
import { getAnalytics } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const { token } = useAuth();
  const [data, setData] = useState(null);

  // --------------- Step 3: Fetch analytics with token ---------------
  useEffect(() => {
    if (!token) return; // wait until token exists
    async function fetchData() {
      try {
        const res = await getAnalytics(token); // token sent in headers
        setData(res.data || res);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [token]);

  // --------------- Step 4: Protect Dashboard route ---------------
  if (!token) return <Navigate to="/login" />;

  if (!data) {
    return <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>Loading analytics...</p>;
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", background: "#f4f6f8", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#1e3c72", marginBottom: "30px" }}>📊 Dashboard Analytics</h2>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <SummaryCard title="Total Investment" value={`$${data.totalInvestment.toFixed(2)}`} bgColor="#4CAF50" />
        <SummaryCard title="Current Value" value={`$${data.currentValue.toFixed(2)}`} bgColor="#2196F3" />
        <SummaryCard title="Total PnL" value={`$${data.profitLoss.toFixed(2)}`} bgColor="#FF9800" />
        <SummaryCard title="PnL Percent" value={`${data.profitLossPercent.toFixed(2)}%`} bgColor="#f44336" />
      </div>

      {/* Coins Breakdown */}
      <h3 style={{ marginTop: "50px", marginBottom: "20px", color: "#1e3c72" }}>💰 Coins Breakdown</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {data.coins.map((c) => (
          <CoinCard key={c.coin} coin={c} />
        ))}
      </div>
    </div>
  );
}

// -------------------- Summary Card Component --------------------
function SummaryCard({ title, value, bgColor }) {
  const [scale, setScale] = useState(1);
  return (
    <div
      style={{
        flex: "1 1 200px",
        minWidth: "200px",
        background: bgColor,
        color: "white",
        padding: "25px 20px",
        borderRadius: "12px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "18px",
        transform: `scale(${scale})`,
        transition: "transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={() => setScale(1.05)}
      onMouseLeave={() => setScale(1)}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "20px", margin: 0 }}>{value}</p>
    </div>
  );
}

// -------------------- Coin Card Component --------------------
function CoinCard({ coin }) {
  const [scale, setScale] = useState(1);

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

