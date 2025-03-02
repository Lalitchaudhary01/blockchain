require("dotenv").config(); // Load environment variables early
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const supportRoutes = require("./routes/supportRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()

// Connect Database
connectDB().catch((err) => {
  console.error("❌ Database connection failed:", err.message);
  process.exit(1);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", supportRoutes);
app.use("/api/profile", profileRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
