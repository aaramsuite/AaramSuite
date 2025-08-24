// controllers/ownerController.js
const Owner = require("../model/ownerModel");
const Hotel = require("../model/hotelModel");
const getNextSequence = require("../utils/getNextSequence");
const bcrypt = require("bcrypt");

// Register owner
module.exports.ownerRegister = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    // check if already exists by phone
    const existingOwner = await Owner.findOne({ phone });
    if (existingOwner) {
      return res.json({ status: false, msg: "Owner already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const ownerId = await getNextSequence("ownerId");

    const owner = await Owner.create({
      name,
      phone,
      password: hashedPassword,
      ownerId
    });

    res.json({ status: true, msg: "Owner registered successfully", owner });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Server Error", error: err.message });
  }
};

// Login owner
module.exports.ownerLogin = async (req, res) => {
  try {
    const { phone, number, password } = req.body;

    // normalize input
    const loginPhone = phone || number;

    const owner = await Owner.findOne({ phone: loginPhone });
    if (!owner) return res.json({ status: false, msg: "Owner not found" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.json({ status: false, msg: "Invalid credentials" });

    res.json({ status: true, msg: "Owner login successful", owner });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Server Error", error: err.message });
  }
};



// Add hotel
module.exports.addHotel = async (req, res) => {
  try {
    const { ownerId, hotelName, hotelCity, hotelImages } = req.body;
    const hotelId = await getNextSequence("hotelId");
    const hotel = new Hotel({ ownerId, hotelId, hotelName, hotelCity, hotelImages });
    await hotel.save();
    res.json({ msg: "Hotel created", hotel });
  } catch (err) {
    res.status(500).json({ msg: "Error creating hotel", error: err.message });
  }
};

// Update hotel
module.exports.updateHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const update = req.body;
    const hotel = await Hotel.findOneAndUpdate(
      { hotelId: parseInt(hotelId) },
      update,
      { new: true }
    );
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });
    res.json({ msg: "Hotel updated", hotel });
  } catch (err) {
    res.status(500).json({ msg: "Error updating hotel", error: err.message });
  }
};

// Add room
module.exports.addRoom = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { type, price, description, images } = req.body;
    const roomId = await getNextSequence("roomId");

    const hotel = await Hotel.findOneAndUpdate(
      { hotelId: parseInt(hotelId) },
      { $push: { rooms: { roomId, type, price, description, images } } },
      { new: true }
    );

    res.json({ msg: "Room added", hotel });
  } catch (err) {
    res.status(500).json({ msg: "Error adding room", error: err.message });
  }
};

// Update room
module.exports.updateRoom = async (req, res) => {
  try {
    const { hotelId, roomId } = req.params;
    const update = req.body;

    const hotel = await Hotel.findOneAndUpdate(
      { hotelId: parseInt(hotelId), "rooms.roomId": parseInt(roomId) },
      { $set: { "rooms.$": { ...update, roomId: parseInt(roomId) } } },
      { new: true }
    );

    res.json({ msg: "Room updated", hotel });
  } catch (err) {
    res.status(500).json({ msg: "Error updating room", error: err.message });
  }
};
