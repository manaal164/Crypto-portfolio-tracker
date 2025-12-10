
const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coin: { type: String, required: true },        // e.g., "BTC"
  symbol: { type: String },                       // optional, e.g., "BTCUSDT"
  quantity: { type: Number, required: true },
  buyPrice: { type: Number, required: true },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Portfolio", portfolioSchema);
