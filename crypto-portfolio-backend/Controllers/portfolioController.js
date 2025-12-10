const Portfolio = require("../Models/Portfolio");
const History = require("../Models/History");

// -----------------------------
// ADD INVESTMENT
// -----------------------------
exports.addInvestment = async (req, res) => {
  try {
    const { coin, symbol, quantity, buyPrice, note } = req.body;
    if (!coin || quantity == null || buyPrice == null)
      return res.status(400).json({ message: "coin, quantity and buyPrice required" });

    const item = new Portfolio({ userId: req.userId, coin, symbol, quantity, buyPrice, note });
    await item.save();

    // Save history
    await History.create({
      userId: req.userId,
      portfolioId: item._id,
      action: "ADD",
      newData: item
    });

    res.json({ message: "Investment added", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// GET ALL INVESTMENTS OF USER
// -----------------------------
exports.getPortfolio = async (req, res) => {
  try {
    const items = await Portfolio.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// UPDATE INVESTMENT
// -----------------------------
exports.updateInvestment = async (req, res) => {
  try {
    const { id } = req.params;

    const oldItem = await Portfolio.findOne({ _id: id, userId: req.userId });
    if (!oldItem) return res.status(404).json({ message: "Not found or not authorized" });

    const updatedItem = await Portfolio.findOneAndUpdate({ _id: id, userId: req.userId }, req.body, { new: true });

    // Save history
    await History.create({
      userId: req.userId,
      portfolioId: id,
      action: "UPDATE",
      oldData: oldItem,
      newData: updatedItem
    });

    res.json({ message: "Updated", item: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// DELETE INVESTMENT
// -----------------------------
exports.deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Portfolio.findOneAndDelete({ _id: id, userId: req.userId });
    if (!item) return res.status(404).json({ message: "Not found or not authorized" });

    // Save history
    await History.create({
      userId: req.userId,
      portfolioId: id,
      action: "DELETE",
      oldData: item
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// GET USER HISTORY
// -----------------------------
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
