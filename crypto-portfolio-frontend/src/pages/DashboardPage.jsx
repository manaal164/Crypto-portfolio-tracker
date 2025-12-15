import { useEffect, useState } from "react";
import { getAnalytics } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import dashboardVideo from "../assets/dashboardani.mp4";

// Register chart.js
Chart.register(...registerables);

// -------------------- AnimatedHero --------------------
function AnimatedHero({ topCoins }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        overflowX: "auto",
        padding: "20px",
        marginBottom: "30px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        borderRadius: "15px",
        color: "white",
        scrollBehavior: "smooth",
      }}
    >
      {topCoins.map((coin) => (
        <div
          key={coin.coin}
          style={{
            minWidth: "150px",
            textAlign: "center",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "15px",
            flexShrink: 0,
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.07)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
          }}
        >
          <h4 style={{ margin: "5px 0", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            {coin.symbol}
          </h4>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "18px" }}>
            ${coin.currentPrice?.toFixed(2) || 0}
          </p>
        </div>
      ))}
    </div>
  );
}

// -------------------- PieChartComponent --------------------
function PieChartComponent({ data }) {
  useEffect(() => {
    if (!data || data.length === 0) return;
    const ctx = document.getElementById("pieChart");
    if (!ctx) return;

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((c) => c.symbol),
        datasets: [
          {
            data: data.map((c) => c.current || 0),
            backgroundColor: data.map(() => `hsl(${Math.random() * 360},70%,60%)`),
          },
        ],
      },
      options: { responsive: true, plugins: { legend: { position: "bottom" } } },
    });
  }, [data]);

  return <canvas id="pieChart" style={{ maxWidth: "500px", margin: "0 auto", display: "block" }} />;
}

// -------------------- LineChartComponent --------------------
function LineChartComponent({ historyData }) {
  useEffect(() => {
    if (!historyData || historyData.length === 0) return;
    const ctx = document.getElementById("lineChart");
    if (!ctx) return;

    new Chart(ctx, {
      type: "line",
      data: {
        labels: historyData.map((h) => h.date),
        datasets: [
          {
            label: "Portfolio Value",
            data: historyData.map((h) => h.totalValue),
            borderColor: "#2196F3",
            backgroundColor: "rgba(33,150,243,0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: "top" } },
        scales: { y: { beginAtZero: false } },
      },
    });
  }, [historyData]);

  return <canvas id="lineChart" style={{ maxWidth: "600px", margin: "30px auto", display: "block" }} />;
}

// -------------------- CoinCard --------------------
function CoinCard({ coin }) {
  const [scale, setScale] = useState(1);
  return (
    <div
      style={{
        flex: "1 1 250px",
        minWidth: "250px",
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(12px)",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
        transform: `scale(${scale})`,
        cursor: "pointer",
        color: "#fff",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
      onMouseEnter={() => setScale(1.05)}
      onMouseLeave={() => setScale(1)}
    >
      <h4 style={{ marginBottom: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
        {coin.coin} ({coin.symbol})
      </h4>
      <div><b>Quantity:</b> {coin.quantity || 0}</div>
      <div><b>Buy Price:</b> ${coin.buyPrice || 0}</div>
      <div><b>Current Price:</b> ${coin.currentPrice || 0}</div>
      <div><b>Invested:</b> ${coin.invested?.toFixed(2) || 0}</div>
      <div><b>Current:</b> ${coin.current?.toFixed(2) || 0}</div>
      <div><b>PnL:</b> ${coin.pnl?.toFixed(2) || 0} ({coin.pnlPercent?.toFixed(2) || 0}%)</div>
    </div>
  );
}

// -------------------- SummaryCard --------------------
function SummaryCard({ title, value, bgColor }) {
  const [scale, setScale] = useState(1);
  return (
    <div
      style={{
        flex: "1 1 200px",
        minWidth: "200px",
        background: `${bgColor}aa`,
        backdropFilter: "blur(10px)",
        color: "white",
        padding: "25px 20px",
        borderRadius: "15px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "18px",
        transform: `scale(${scale})`,
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "default",
      }}
      onMouseEnter={() => setScale(1.05)}
      onMouseLeave={() => setScale(1)}
    >
      <h3 style={{ marginBottom: "10px", fontFamily: "'Inter', sans-serif" }}>{title}</h3>
      <p style={{ fontSize: "20px", margin: 0 }}>{value}</p>
    </div>
  );
}

// -------------------- DashboardPage --------------------
export default function DashboardPage() {
  const { token } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!token) return;
    async function fetchData() {
      try {
        const res = await getAnalytics(token);
        console.log("Analytics Data:", res.data); // ← ye add karo

        const analytics = res.data || {};
        setData({
          name: analytics.name || "Investor",
          totalInvestment: analytics.totalInvestment || 0,
          currentValue: analytics.currentValue || 0,
          profitLoss: analytics.profitLoss || 0,
          profitLossPercent: analytics.profitLossPercent || 0,
          coins: analytics.coins || [],
          history: analytics.history || [],
        });
      } catch (err) {
        console.error(err);
        setData({
          totalInvestment: 0,
          currentValue: 0,
          profitLoss: 0,
          profitLossPercent: 0,
          coins: [],
          history: [],
        });
      }
    }
    fetchData();
  }, [token]);

  if (!token) return <Navigate to="/login" />;
  if (!data) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* ================= Background Video ================= */}
      <video
        src={dashboardVideo}
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

      {/* ================= Dark Overlay ================= */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          zIndex: -1,
        }}
      />

      {/* ================= Dashboard Content ================= */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "40px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "32px",
            fontWeight: "700",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            lineHeight: "0.15",

          }}
        >
          Welcome, {data.name || "Investor"}! 👋
        </h2>
        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "16px",
            color: "#d0d4de",
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          “Invest in yourself today, your future self will thank you.” 🚀
        </p>


        {data.coins.length > 0 && (
          <AnimatedHero topCoins={data.coins.slice(0, 10)} />
        )}

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <SummaryCard
            title="Total Investment"
            value={`$${data.totalInvestment.toFixed(2)}`}
            bgColor="#4CAF50"
          />
          <SummaryCard
            title="Current Value"
            value={`$${data.currentValue.toFixed(2)}`}
            bgColor="#2196F3"
          />
          <SummaryCard
            title="Total PnL"
            value={`$${data.profitLoss.toFixed(2)}`}
            bgColor="#FF9800"
          />
          <SummaryCard
            title="PnL Percent"
            value={`${data.profitLossPercent.toFixed(2)}%`}
            bgColor="#f44336"
          />
        </div>

        {data.coins.length > 0 && <PieChartComponent data={data.coins} />}
        {data.history.length > 0 && (
          <LineChartComponent historyData={data.history} />
        )}

        <h3
          style={{
            marginTop: "50px",
            marginBottom: "20px",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          💰 Coins Breakdown
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {data.coins.length > 0 ? (
            data.coins.map((c) => <CoinCard key={c.coin} coin={c} />)
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>
              No coins added yet. Add your first investment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
