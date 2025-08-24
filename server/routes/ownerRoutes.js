const express = require("express");
const { ownerRegister, ownerLogin, addHotel, updateHotel, addRoom, updateRoom } = require("../controllers/ownerController");

const router = express.Router();

// Auth
router.post("/register", ownerRegister);
router.post("/login", ownerLogin);

// Hotel management
router.post("/hotel", addHotel);
router.put("/hotel/:hotelId", updateHotel);

// Room management
router.post("/hotel/:hotelId/room", addRoom);
router.put("/hotel/:hotelId/room/:roomId", updateRoom);

module.exports = router;
