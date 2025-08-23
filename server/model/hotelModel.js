const mongoose = require("mongoose");
const getNextSequence = require("../utils/getNextSequence");

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }]
});

const hotelSchema = new mongoose.Schema({
  hotelId: { type: Number, unique: true },
  hotelName: { type: String, required: true },
  hotelCity: { type: String, required: true },
  rooms: { type: [roomSchema], required: true }
}, { collection: "hotels" });

// Pre-save hook for numeric ID
hotelSchema.pre("save", async function (next) {
  if (!this.hotelId) {
    this.hotelId = await getNextSequence("hotelId");
  }
  next();
});

module.exports = mongoose.model("Hotel", hotelSchema);
