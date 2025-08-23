const Hotel = require("../model/hotelModel");

module.exports.registerHotel = async (req, res, next) => {
  try {
    const { hotelName, hotelCity, rooms, hotelImages } = req.body;

    const newHotel = new Hotel({
      hotelName,
      hotelCity,
      rooms,
      hotelImages: hotelImages || []
    });

    await newHotel.save();
    res.status(201).json({ message: "Hotel registered successfully", hotel: newHotel });
  } catch (err) {
    next(err);
  }
};

module.exports.getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    next(err);
  }
};

module.exports.getHotelById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid hotelId in URL" });
    }

    const hotel = await Hotel.findOne({ hotelId: id });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.json(hotel);
  } catch (err) {
    next(err);
  }
};
