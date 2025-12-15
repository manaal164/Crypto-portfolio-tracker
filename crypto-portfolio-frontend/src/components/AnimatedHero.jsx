import { motion } from "framer-motion";
import Lottie from "lottie-react";

import { coinIcons } from "../assets/coins";

export default function AnimatedHero({ topCoins }) {
  return (
    <div style={{ position: "relative", textAlign: "center", marginBottom: "50px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3c72" }}>
        🚀 Top Coins
      </h2>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "25px", marginTop: "20px" }}>
        {topCoins.map((c) => (
          <motion.div
            key={c.coin}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={coinIcons[c.symbol] || "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024"}
              alt={c.coin}
              style={{ width: "50px", height: "50px" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Lottie Animation */}
      <div style={{ position: "absolute", top: -50, right: 10, width: 150, height: 150 }}>
        <Lottie
          animationData={"https://assets7.lottiefiles.com/packages/lf20_jmgekfqg.json"}
          loop
        />
      </div>
    </div>
  );
}
