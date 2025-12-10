import { useState } from "react";
import { addInvestment } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";

export default function AddInvestmentPage() {
  const { token } = useAuth();

  const [coin, setCoin] = useState("");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [note, setNote] = useState("");

  const submit = async () => {
    try {
      await addInvestment({ coin, symbol, quantity, buyPrice, note }, token);
      alert("Investment Added");
    } catch (err) {
      alert("Error while adding");
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>Add Investment</h2>

      <input placeholder="Coin Name (e.g. bitcoin)"
        onChange={(e) => setCoin(e.target.value)} /> <br /><br />

      <input placeholder="Symbol (btc)"
        onChange={(e) => setSymbol(e.target.value)} /> <br /><br />

      <input placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)} /> <br /><br />

      <input placeholder="Buy Price"
        onChange={(e) => setBuyPrice(e.target.value)} /> <br /><br />

      <textarea placeholder="Note"
        onChange={(e) => setNote(e.target.value)} /> <br /><br />

      <button onClick={submit}>Add</button>
    </div>
  );
}
