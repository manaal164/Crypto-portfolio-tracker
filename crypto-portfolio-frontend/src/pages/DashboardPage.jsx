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
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div style={{ margin: "40px" }}>
      <h2>Dashboard Analytics</h2>

      <div style={{ marginTop: "20px" }}>
        <p><b>Total Investment:</b> ${data.totalInvestment.toFixed(2)}</p>
        <p><b>Current Value:</b> ${data.currentValue.toFixed(2)}</p>
        <p><b>Total PnL:</b> ${data.profitLoss.toFixed(2)}</p>
        <p><b>PnL Percent:</b> {data.profitLossPercent.toFixed(2)}%</p>
      </div>

      <h3 style={{ marginTop: "30px" }}>Coins Breakdown</h3>
      {data.coins.map((c) => (
        <div key={c.coin} style={{ border: "1px solid #ccc", padding: "15px", marginTop: "10px" }}>
          <p><b>Coin:</b> {c.coin} ({c.symbol})</p>
          <p>Quantity: {c.quantity}</p>
          <p>Buy Price: ${c.buyPrice}</p>
          <p>Current Price: ${c.currentPrice}</p>
          <p>Invested: ${c.invested.toFixed(2)}</p>
          <p>Current: ${c.current.toFixed(2)}</p>
          <p>PnL: ${c.pnl.toFixed(2)} ({c.pnlPercent.toFixed(2)}%)</p>
        </div>
      ))}
    </div>
  );
}
