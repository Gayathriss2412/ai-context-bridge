const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "AI Context Bridge backend is running!",
  });
});

module.exports = router;