const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to AI Context Bridge Backend!");
});

// Health-check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "AI Context Bridge backend is running!"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});