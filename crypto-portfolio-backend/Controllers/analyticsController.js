// Controllers/analyticsController.js

const Portfolio = require("../Models/Portfolio");
const User = require("../Models/User");
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

// Temporary in-memory map to hold symbol -> current price
let coinPriceMap = {};

// Fetch top 250 coins from CoinGecko periodically
async function updateCoinPrices() {
  try {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 250,
        page: 1,
        sparkline: false
      }
    });

    coinPriceMap = {};
    res.data.forEach((coin) => {
      if (coin.symbol) {
        coinPriceMap[coin.symbol.toUpperCase()] = coin.current_price;
      }
    });

    console.log("Coin prices updated");
  } catch (err) {
    console.error("Failed to fetch coin prices:", err.message);
  }
}

// Update coin prices on server start and every 5 minutes
updateCoinPrices();
setInterval(updateCoinPrices, 5 * 60 * 1000);

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.userId;

    // 1) Fetch all investments of this user
    const items = await Portfolio.find({ userId });
    const user = await User.findById(userId); // userId req.userId se aa raha hai


    if (items.length === 0) {
      return res.json({
        name: user?.name,
        totalInvestment: 0,
        currentValue: 0,
        profitLoss: 0,
        profitLossPercent: 0,
        coins: []
      });
    }

    let totalInvestment = 0;
    let currentValue = 0;
    let coinsResult = [];

    // 2) Calculate per-coin analytics
    for (let item of items) {
      const { coin, quantity, buyPrice, symbol } = item;

      // Get live price from pre-fetched coinPriceMap
      const livePrice = coinPriceMap[symbol.toUpperCase()] ?? buyPrice;

      if (!coinPriceMap[symbol.toUpperCase()]) {
        console.log(`Price fetch warning: ${symbol} not found in CoinGecko map, using buyPrice`);
      }

      const invested = quantity * buyPrice;
      const current = quantity * livePrice;
      const pnl = current - invested;
      const pnlPercent = invested === 0 ? 0 : (pnl / invested) * 100;

      totalInvestment += invested;
      currentValue += current;

      coinsResult.push({
        coin,
        symbol,
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
      name: user?.name,
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
