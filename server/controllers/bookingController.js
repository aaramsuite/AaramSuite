const Booking = require("../models/bookingModel");

module.exports.createBooking = async (req, res, next) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate("hotelId");
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};
