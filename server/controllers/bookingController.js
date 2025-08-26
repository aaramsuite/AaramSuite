const Booking = require("../model/bookingModel");

// Create booking
module.exports.createBooking = async (req, res) => {
  try {
    const { hotelId, roomId, userId, guestName, guestAge, guests, checkIn, checkOut } = req.body;

    if (!hotelId || !roomId || !userId) {
      return res.status(400).json({ message: "hotelId, roomId and userId are required" });
    }

    const booking = new Booking({
      hotelId: parseInt(hotelId),
      roomId: parseInt(roomId),
      userId: parseInt(userId),
      guestName,
      guestAge: parseInt(guestAge),
      guests: parseInt(guests),
      checkIn,
      checkOut
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get bookings for a user
module.exports.getUserBookings = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);  // <-- use query, not params
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const bookings = await Booking.find({ userId }).sort({ checkIn: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Update booking status
module.exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findOneAndUpdate(
      { bookingId: parseInt(bookingId) },
      { status },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking status updated", booking });
  } catch (err) {
    res.status(500).json({ message: "Error updating booking", error: err.message });
  }
};
