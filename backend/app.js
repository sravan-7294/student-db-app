require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

// Main route
app.get("/", (req, res) => {
  res.send("<h1>Welcome To Users API!</h1>");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
