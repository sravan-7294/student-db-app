const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: Number, required: true },
});

const User = mongoose.model("User", schema);

module.exports = User;
