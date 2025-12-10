const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" },
  action: { type: String, required: true }, // "ADD", "UPDATE", "DELETE"
  oldData: { type: Object },               // Previous state (for UPDATE/DELETE)
  newData: { type: Object },               // New state (for ADD/UPDATE)
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", historySchema);
