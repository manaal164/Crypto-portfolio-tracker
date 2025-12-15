import { useState, useEffect } from "react";
import { addInvestment } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";
import axios from "axios";
import Notification from "../components/Notification";
import addInvestVideo from "../assets/addinvestani.mp4";

export default function AddInvestmentPage() {
  const { token } = useAuth();

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [symbol, setSymbol] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "success" });

  // Fetch coins from CoinGecko
  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 250,
              page: 1,
              sparkline: false,
            },
          }
        );
        const coinOptions = res.data.map((c) => ({
          value: c.id,
          label: `${c.name} (${c.symbol.toUpperCase()})`,
          price: c.current_price,
          symbol: c.symbol.toUpperCase(),
        }));
        setCoins(coinOptions);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCoins();
  }, []);

  const handleCoinChange = (coin) => {
    setSelectedCoin(coin);
    setBuyPrice(coin.price);
    setSymbol(coin.symbol);
  };

  const submit = async () => {
    if (!selectedCoin || !quantity || !buyPrice) {
      setNotification({ message: "Please fill all required fields ❌", type: "error" });
      setTimeout(() => setNotification({ message: "", type: "success" }), 3000);
      return;
    }

    setLoading(true);
    try {
      await addInvestment(
        {
          coin: selectedCoin.label,
          symbol,
          quantity,
          buyPrice,
          note,
        },
        token
      );

      setNotification({ message: "Investment added successfully ✅", type: "success" });

      setSelectedCoin(null);
      setQuantity("");
      setBuyPrice("");
      setSymbol("");
      setNote("");
    } catch (err) {
      console.error(err);
      setNotification({ message: "Error while adding investment ❌", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification({ message: "", type: "success" }), 3000);
    }
  };

  const commonInputStyle = {
    width: "95%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(0,0,0,0.35)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s",
  };

  const styles = {
    page: {
      position: "relative",
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 15px",
      color: "#fff",
    },
    card: {
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(14px)",
      padding: "25px",
      borderRadius: "18px",
      boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
      width: "100%",
      maxWidth: "400px",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    title: {
      textAlign: "center",
      fontSize: "26px",
      marginBottom: "22px",
      fontWeight: "600",
      textShadow: "0 2px 8px rgba(0,0,0,0.7)",
    },
    btn: {
      width: "100%",
      padding: "12px",
      background: "#1e3c72",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "500",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.page}>
      <video
        src={addInvestVideo}
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

      <style>{`
        button:hover {
          opacity: 0.9;
          transform: scale(1.03);
        }
        input:focus, textarea:focus {
          border-color: #1e3c72;
          box-shadow: 0 0 8px rgba(30,60,114,0.3);
        }
      `}</style>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "success" })}
      />

      <div style={styles.card}>
        <h2 style={styles.title}>Add Investment 💹</h2>

        <Select
          options={coins}
          value={selectedCoin}
          onChange={handleCoinChange}
          placeholder="Search & select coin..."
          isSearchable
          styles={{
            control: (provided, state) => ({
              ...provided,
              marginBottom: "12px",
              borderRadius: "8px",
              background: "rgba(0,0,0,0.35)",
              border: state.isFocused ? "1px solid #1e3c72" : "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              boxShadow: state.isFocused ? "0 0 8px rgba(30,60,114,0.3)" : "none",
              "&:hover": { borderColor: "#1e3c72" },
            }),
            menu: (provided) => ({
              ...provided,
              background: "rgba(0,0,0,0.8)",
              color: "#fff",
              zIndex: 9999,
            }),
            option: (provided, state) => ({
              ...provided,
              background: state.isFocused
                ? "rgba(30,60,114,0.8)"
                : state.isSelected
                ? "rgba(33,150,243,0.6)"
                : "transparent",
              color: "#fff",
              cursor: "pointer",
            }),
            singleValue: (provided) => ({ ...provided, color: "#fff" }),
            input: (provided) => ({ ...provided, color: "#fff" }),
            placeholder: (provided) => ({ ...provided, color: "rgba(255,255,255,0.6)" }),
            dropdownIndicator: (provided) => ({ ...provided, color: "#fff" }),
            indicatorSeparator: (provided) => ({ ...provided, backgroundColor: "rgba(255,255,255,0.3)" }),
          }}
        />

        <input placeholder="Symbol" style={commonInputStyle} value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <input placeholder="Quantity" style={commonInputStyle} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input placeholder="Buy Price (USD)" style={commonInputStyle} type="number" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
        <textarea placeholder="Note (optional)" style={{...commonInputStyle, minHeight: "70px"}} value={note} onChange={(e) => setNote(e.target.value)} />

        <button style={styles.btn} onClick={submit} disabled={loading}>
          {loading ? "Adding..." : "Add Investment"}
        </button>
      </div>
    </div>
  );
}
