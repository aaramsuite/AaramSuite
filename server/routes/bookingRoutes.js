const express = require("express");
const { createBooking, getUserBookings, updateBookingStatus } = require("../controllers/bookingController");
const router = express.Router();

router.get("/user", getUserBookings);
router.post("/create", createBooking);
router.put("/update-status", updateBookingStatus);

module.exports = router;