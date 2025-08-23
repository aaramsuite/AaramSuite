const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: { type: Number, unique: true },   // auto-increment numeric bookingId
  hotelId: { type: Number, required: true },   // numeric hotelId
  roomId: { type: Number, required: true },    // numeric roomId (inside hotel.rooms)
  userId: { type: Number, required: true },    // numeric userId
  guestName: { type: String, required: true },
  guestAge: { type: Number, required: true },
  guests: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
}, { collection: "bookings" });

// auto-increment bookingId
const Counter = require("./counterModel");
bookingSchema.pre("save", async function (next) {
  if (!this.bookingId) {
    const counter = await Counter.findOneAndUpdate(
      { name: "bookingId" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.bookingId = counter.value;
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
