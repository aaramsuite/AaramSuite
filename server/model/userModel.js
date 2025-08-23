const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
}, { collection: "users" });

module.exports = mongoose.model("User", userSchema);
