/*
import { useState, useEffect } from "react";
import { addInvestment } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";
import axios from "axios";

export default function AddInvestmentPage() {
  const { token } = useAuth();

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [symbol, setSymbol] = useState(""); // ✅ alag symbol field
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Auto-fill buyPrice and symbol when coin selected
  const handleCoinChange = (coin) => {
    setSelectedCoin(coin);
    setBuyPrice(coin.price); // auto buy price
    setSymbol(coin.symbol); // ✅ auto symbol
  };

  const submit = async () => {
    if (!selectedCoin || !quantity || !buyPrice) {
      alert("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await addInvestment(
        {
          coin: selectedCoin.label, // Coin name
          symbol: symbol,           // alag symbol field
          quantity,
          buyPrice,
          note,
        },
        token
      );
      alert("Investment Added ✅");

      // Clear form
      setSelectedCoin(null);
      setQuantity("");
      setBuyPrice("");
      setSymbol("");
      setNote("");
    } catch (err) {
      alert("Error while adding investment");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "30px 15px",
      fontFamily: "'Roboto', sans-serif",
      background: "#f5f7fa",
      minHeight: "100vh",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
      width: "100%",
      maxWidth: "350px",
      transition: "0.3s",
    },
    title: {
      textAlign: "center",
      marginBottom: "18px",
      color: "#1e3c72",
      fontSize: "22px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #d1dbe8",
      fontSize: "14px",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #d1dbe8",
      fontSize: "14px",
      minHeight: "70px",
      resize: "vertical",
      outline: "none",
    },
    btn: {
      width: "100%",
      padding: "12px",
      background: "#1e3c72",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "500",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        button:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
        input:focus, textarea:focus {
          border-color: #1e3c72;
          box-shadow: 0 0 5px rgba(30,60,114,0.2);
        }
      `}</style>

      <div style={styles.card}>
        <h2 style={styles.title}>Add Investment 💹</h2>

        <Select
          options={coins}
          value={selectedCoin}
          onChange={handleCoinChange}
          placeholder="Search & select coin..."
          isSearchable
          styles={{
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
            control: (provided) => ({ ...provided, marginBottom: "12px", borderRadius: "6px" }),
          }}
        />

        <input
          placeholder="Symbol"
          style={styles.input}
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <input
          placeholder="Quantity"
          style={styles.input}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          placeholder="Buy Price (USD)"
          style={styles.input}
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />

        <textarea
          placeholder="Note (optional)"
          style={styles.textarea}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button style={styles.btn} onClick={submit} disabled={loading}>
          {loading ? "Adding..." : "Add Investment"}
        </button>
      </div>
    </div>
  );
}
  */
 import { useState, useEffect } from "react";
import { addInvestment } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";
import axios from "axios";
import Notification from "../components/Notification";

export default function AddInvestmentPage() {
  const { token } = useAuth();

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [symbol, setSymbol] = useState(""); // ✅ alag symbol field
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

  // Auto-fill buyPrice and symbol when coin selected
  const handleCoinChange = (coin) => {
    setSelectedCoin(coin);
    setBuyPrice(coin.price); // auto buy price
    setSymbol(coin.symbol); // ✅ auto symbol
  };

  const submit = async () => {
    if (!selectedCoin || !quantity || !buyPrice) {
      setNotification({ message: "Please fill all required fields", type: "error" });
      setTimeout(() => setNotification({ message: "", type: "success" }), 3000);
      return;
    }

    setLoading(true);
    try {
      await addInvestment(
        {
          coin: selectedCoin.label, // Coin name
          symbol: symbol,           // alag symbol field
          quantity,
          buyPrice,
          note,
        },
        token
      );

      // Show success notification
      setNotification({ message: "Investment added successfully ✅", type: "success" });

      // Clear form
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
      // Hide notification after 3 seconds
      setTimeout(() => setNotification({ message: "", type: "success" }), 3000);
    }
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "30px 15px",
      fontFamily: "'Roboto', sans-serif",
      background: "#f5f7fa",
      minHeight: "100vh",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
      width: "100%",
      maxWidth: "350px",
      transition: "0.3s",
    },
    title: {
      textAlign: "center",
      marginBottom: "18px",
      color: "#1e3c72",
      fontSize: "22px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #d1dbe8",
      fontSize: "14px",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #d1dbe8",
      fontSize: "14px",
      minHeight: "70px",
      resize: "vertical",
      outline: "none",
    },
    btn: {
      width: "100%",
      padding: "12px",
      background: "#1e3c72",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "500",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        button:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
        input:focus, textarea:focus {
          border-color: #1e3c72;
          box-shadow: 0 0 5px rgba(30,60,114,0.2);
        }
      `}</style>

      {/* Notification */}
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
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
            control: (provided) => ({ ...provided, marginBottom: "12px", borderRadius: "6px" }),
          }}
        />

        <input
          placeholder="Symbol"
          style={styles.input}
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <input
          placeholder="Quantity"
          style={styles.input}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          placeholder="Buy Price (USD)"
          style={styles.input}
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />

        <textarea
          placeholder="Note (optional)"
          style={styles.textarea}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button style={styles.btn} onClick={submit} disabled={loading}>
          {loading ? "Adding..." : "Add Investment"}
        </button>
      </div>
    </div>
  );
}

