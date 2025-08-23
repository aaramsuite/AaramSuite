const mongoose = require("mongoose");

// Define the schema for rooms
const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }], // Ensure this is an array of strings
});


// Define the schema for hotels
const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  hotelCity: {
    type: String,
    required: true,
  },
  rooms: {
    type: [roomSchema], // Array of room documents
    required: true,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
