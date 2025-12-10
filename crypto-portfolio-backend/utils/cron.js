const cron = require("node-cron");
const Portfolio = require("../Models/Portfolio");
const History = require("../Models/History");

// Daily snapshot at 00:00 server time
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running daily portfolio snapshot...");

    const allPortfolios = await Portfolio.find();

    if (!allPortfolios.length) return console.log("No portfolios to track today.");

    const snapshots = allPortfolios.map(item => ({
      userId: item.userId,
      portfolioId: item._id,
      action: "DAILY_TRACK",
      oldData: item,
      timestamp: new Date()
    }));

    await History.insertMany(snapshots);
    console.log(`Daily snapshot added for ${snapshots.length} items.`);
  } catch (err) {
    console.error("Error in daily snapshot cron:", err);
  }
});
