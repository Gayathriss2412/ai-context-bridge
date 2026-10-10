const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to AI Context Bridge Backend!");
});

// Health-check routes
app.use("/api/health", healthRoutes);

// Project management routes
app.use("/api/projects", projectRoutes);

// Start server after connecting to MongoDB
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();