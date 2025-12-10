require("./utils/cron");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./Routes/authRoutes");
const portfolioRoutes = require("./Routes/portfolioRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || true }));

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);

// health
app.get("/", (req, res) => res.send("Crypto Portfolio Backend is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
