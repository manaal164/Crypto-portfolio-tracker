const History = require("../Models/History");

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
