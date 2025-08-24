const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // unique phone
  password: { type: String, required: true },
  ownerId: { type: Number, unique: true }
}, { collection: "owners" });

module.exports = mongoose.model("Owner", ownerSchema);
