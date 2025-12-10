import { useEffect, useState } from "react";
import { getPortfolio, deleteInvestment } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";

export default function ViewInvestmentsPage() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await getPortfolio(token);
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    try {
      await deleteInvestment(id, token);
      load();
    } catch {
      alert("Delete error");
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>My Investments</h2>

      {items.map((i) => (
        <div key={i._id} style={{ border: "1px solid #ccc", padding: "15px", marginTop: "10px" }}>
          <p><b>{i.coin}</b> ({i.symbol})</p>
          <p>Qty: {i.quantity}</p>
          <p>Buy Price: {i.buyPrice}</p>

          <button onClick={() => remove(i._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
