const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Navigate to <a href='/api/movies'>/api/movies</a>");
});

module.exports = router;
