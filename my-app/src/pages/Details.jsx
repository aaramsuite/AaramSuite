import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaHotel } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Details = () => {
  const { id } = useParams();  // e.g. /details/1 → id = "1"
  const [hotel, setHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomImages, setSelectedRoomImages] = useState([]);
  const [initialImageIndex, setInitialImageIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState({});

  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    guestName: "",
    guestAge: "",
    guests: 1,
    checkIn: "",
    checkOut: ""
  });


  // Fetch hotel from backend
useEffect(() => {
  const fetchHotel = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/hotels/${id}`);
      setHotel(res.data);
    } catch (err) {
      console.error("Error fetching hotel:", err);
    }
  };
  fetchHotel();
}, [id]);

  if (!hotel) return <div>Loading hotel details...</div>;
  const rooms = hotel.rooms || [];

  const handleImageClick = (images, index) => {
    setSelectedRoomImages(images);
    setInitialImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoomImages([]);
    setInitialImageIndex(0);
  };

  const toggleDescription = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };
  const handleBookNowClick = (room) => {
  setSelectedRoom(room);
  setIsBookingFormOpen(true);
};

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleBookingSubmit = async () => {
  const storedUser = JSON.parse(localStorage.getItem("hotel-user"));
  if (!storedUser) {
    alert("Please login to book a room!");
    return;
  }

  try {
    const res = await axios.post("http://localhost:8000/api/bookings/create", {
      hotelId: hotel.hotelId,
      roomId: selectedRoom._id,   // change to numeric id if needed
      userId: storedUser.userId,
      ...formData
    });
    alert("Booking successful!");
    setIsBookingFormOpen(false);
  } catch (err) {
    console.error("Booking failed:", err);
    alert("Booking failed!");
  }
};


  return (
    <div className="bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] min-h-screen py-10 px-4">
      <Navbar/>
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12 mt-12">
        Welcome to <span className="text-indigo-500">{hotel.hotelName}</span>
      </h1>

      {/* Hotel Gallery */}
      {hotel.hotelImages && hotel.hotelImages.length > 0 && (
        <div className="mt-10 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hotel.hotelImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Hotel view ${idx + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      )}

      {/* Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {rooms.map((room, roomIndex) => (
          <div
            key={roomIndex}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Slider {...carouselSettings} className="rounded-t-lg">
              {room.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`${room.type} ${imgIndex + 1}`}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => handleImageClick(room.images, imgIndex)}
                />
              ))}
            </Slider>
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {room.type}
              </h2>
              <p className="text-gray-600">
                {expandedIndexes[roomIndex] || (room.description?.length || 0) <= 100
                  ? room.description
                  : `${room.description.slice(0, 100)}...`}
                {room.description && room.description.length > 100 && (
                  <button
                    onClick={() => toggleDescription(roomIndex)}
                    className="text-indigo-500 ml-2 hover:underline"
                  >
                    {expandedIndexes[roomIndex] ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
              <p className="text-indigo-500 font-bold mt-3">₹{room.price}/Night</p>
              <button
  className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300"
  onClick={() => handleBookNowClick(room)}
>
  Book Now
</button>


            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="mt-16 bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 flex justify-center items-center">
          <FaHotel className="text-indigo-500 mr-3" />
          About <span className="text-indigo-500 ml-2">{hotel.hotelName}</span>
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          {hotel.hotelName} offers a perfect blend of comfort and luxury.
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={closeModal}
            >
              ✕
            </button>
            <Slider {...carouselSettings} initialSlide={initialImageIndex}>
              {selectedRoomImages.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`Room ${imgIndex + 1}`}
                  className="w-full max-h-80 object-contain rounded-md"
                />
              ))}
            </Slider>
          </div>
        </div>
      )}
      {isBookingFormOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
      <input
        type="text"
        name="guestName"
        placeholder="Guest Name"
        value={formData.guestName}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />
      <input
        type="number"
        name="guestAge"
        placeholder="Guest Age"
        value={formData.guestAge}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />
      <input
        type="number"
        name="guests"
        placeholder="No. of Guests"
        value={formData.guests}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />
      <label>Check-In:</label>
      <input
        type="date"
        name="checkIn"
        value={formData.checkIn}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />
      <label>Check-Out:</label>
      <input
        type="date"
        name="checkOut"
        value={formData.checkOut}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={() => setIsBookingFormOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={handleBookingSubmit}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Details;
