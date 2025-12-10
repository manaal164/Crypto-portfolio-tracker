// Controllers/analyticsController.js

const Portfolio = require("../Models/Portfolio");
const axios = require("axios");

/*
  ---------------------------------------------
  ANALYTICS CONTROLLER
  Calculates:
    ✔ Total Investment
    ✔ Current Value (from live API)
    ✔ Total PnL
    ✔ PnL Percent
    ✔ Per-coin breakdown
  ---------------------------------------------
*/

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.userId;

    // 1) Fetch all investments of this user
    const items = await Portfolio.find({ userId });

    if (items.length === 0) {
      return res.json({
        totalInvestment: 0,
        currentValue: 0,
        profitLoss: 0,
        profitLossPercent: 0,
        coins: []
      });
    }

    // Temporary containers
    let totalInvestment = 0;
    let currentValue = 0;
    let coinsResult = [];

    // 2) Fetch live prices coin-by-coin from CoinGecko
    for (let item of items) {
      const { coin, quantity, buyPrice } = item;

      let livePrice = 0;

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coin.toLowerCase()}&vs_currencies=usd`
        );

        livePrice = response.data[coin.toLowerCase()].usd;
      } catch (err) {
        console.log("Price fetch error for:", coin, err.message);
        livePrice = buyPrice; // fallback so calculation doesn’t break
      }

      // Calculations
      const invested = quantity * buyPrice;
      const current = quantity * livePrice;
      const pnl = current - invested;
      const pnlPercent = (pnl / invested) * 100;

      totalInvestment += invested;
      currentValue += current;

      coinsResult.push({
        coin: item.coin,
        symbol: item.symbol,
        quantity,
        buyPrice,
        currentPrice: livePrice,
        invested,
        current,
        pnl,
        pnlPercent
      });
    }

    // 3) Calculate final totals
    const profitLoss = currentValue - totalInvestment;
    const profitLossPercent =
      totalInvestment === 0 ? 0 : (profitLoss / totalInvestment) * 100;

    // 4) Send analytics output
    return res.json({
      totalInvestment,
      currentValue,
      profitLoss,
      profitLossPercent,
      coins: coinsResult
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
