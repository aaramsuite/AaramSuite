const Hotel = require('../model/hotelModel');

module.exports.hotelRegister = async (req, res, next) => {
    try {
        const { hotelName, hotelCity, rooms } = req.body; // Extracting fields from request body

        if (!hotelName || !hotelCity || !rooms || !Array.isArray(rooms)) {
            return res.status(400).json({ message: "Invalid input data." });
        }

        // Validate room details
        for (let room of rooms) {
            if (!room.title || !room.description || !room.images || !Array.isArray(room.images) || room.images.length === 0) {
                return res.status(400).json({ message: "Invalid room details." });
            }
        }

        // Create hotel instance
        const newHotel = new Hotel({
            hotelName,
            hotelCity,
            rooms,
        });

        await newHotel.save();
        return res.status(201).json({ message: "Hotel registered successfully", hotel: newHotel });
    } catch (error) {
        next(error);
    }
};
