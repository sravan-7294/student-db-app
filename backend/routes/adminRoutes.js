require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.json({ message: "Invalid username or password" });
  }
});

module.exports = router;
