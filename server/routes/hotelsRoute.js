const express = require("express");
const { registerHotel, getHotels, getHotelById } = require("../controllers/hotelController");
const router = express.Router();

router.post("/register", registerHotel);
router.get("/", getHotels);
router.get("/:id", getHotelById);

module.exports = router;
