require("./utils/cron");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./Routes/authRoutes");
const portfolioRoutes = require("./Routes/portfolioRoutes");

const app = express();

// -----------------------------
// MIDDLEWARES
// -----------------------------
app.use(express.json());

// Enable CORS properly
// FRONTEND_URL should be your frontend app URL, e.g., "http://localhost:5173"
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,
}));
/*app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, // allow cookies if needed
}));*/

// -----------------------------
// DATABASE CONNECTION
// -----------------------------
connectDB();

// -----------------------------
// ROUTES
// -----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);

// -----------------------------
// HEALTH CHECK
// -----------------------------
app.get("/", (req, res) => res.send("Crypto Portfolio Backend is running"));

// -----------------------------
// START SERVER
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
