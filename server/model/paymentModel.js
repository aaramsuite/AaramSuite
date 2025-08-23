const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["UPI", "Card", "Cash"], required: true },
  status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  timestamp: { type: Date, default: Date.now }
}, { collection: "payments" });

module.exports = mongoose.model("Payment", paymentSchema);