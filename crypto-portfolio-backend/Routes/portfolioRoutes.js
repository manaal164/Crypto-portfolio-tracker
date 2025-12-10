
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getAnalytics } = require("../Controllers/analyticsController");
const { getHistory } = require("../Controllers/historyController");


const {
  addInvestment,
  getPortfolio,
  updateInvestment,
  deleteInvestment
} = require("../Controllers/portfolioController");

router.post("/add", auth, addInvestment);
router.get("/list", auth, getPortfolio);
router.put("/update/:id", auth, updateInvestment);
router.delete("/delete/:id", auth, deleteInvestment);

// GET ANALYTICS (protected)
router.get("/analytics", auth, getAnalytics);

// GET USER HISTORY
router.get("/history", auth, getHistory);

module.exports = router;
