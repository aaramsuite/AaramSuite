const mongoose = require("mongoose");
const getNextSequence = require("../utils/getNextSequence");

const roomSchema = new mongoose.Schema({
  roomId: { type: Number, required: true }, // numeric
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [String]
});

const hotelSchema = new mongoose.Schema({
  hotelId: { type: Number, unique: true },
  hotelName: { type: String, required: true },
  hotelCity: { type: String, required: true },
  hotelImages: [String],
  ownerId: { type: Number, required: true }, // link to Owner
  rooms: [roomSchema]
}, { collection: "hotels" });


// Pre-save hook for numeric ID
hotelSchema.pre("save", async function (next) {
  if (!this.hotelId) {
    this.hotelId = await getNextSequence("hotelId");
  }
  next();
});

module.exports = mongoose.model("Hotel", hotelSchema);
