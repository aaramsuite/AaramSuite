const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }]
});

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  hotelCity: { type: String, required: true },
  rooms: { type: [roomSchema], required: true }
}, { collection: "hotels" });

module.exports = mongoose.model("Hotel", hotelSchema);
