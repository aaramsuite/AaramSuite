import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaHotel } from "react-icons/fa"; // Import Font Awesome hotel icon
import { useLocation } from "react-router-dom"; // Import useLocation
import Navbar from "./Navbar";


const Details = () => {
  const location = useLocation(); // Get the location object from react-router-dom
  const { hotel } = location.state || {};  // Destructuring the hotel prop from location.state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomImages, setSelectedRoomImages] = useState([]);
  const [initialImageIndex, setInitialImageIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState({});

  const rooms = hotel.rooms || [];
  // console.log(hotel);
  const handleSubmit = (room) => {
    // console.log(room.title);
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  if (!hotel) {
    return <div>Hotel data not available. Please try again.</div>; // Display fallback UI if hotel is undefined
  }
  if (rooms.length === 0) {
    return <div>No rooms available for this hotel.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] min-h-screen py-10 px-4">
      <Navbar/>
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12 mt-12">
        Welcome to <span className="text-indigo-500">{hotel.hotelName}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  alt={`${room.title} ${imgIndex + 1}`}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => handleImageClick(room.images, imgIndex)}
                />
              
              ))}
            </Slider>
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {room.title}
              </h2>
              <p className="text-gray-600">
                {expandedIndexes[roomIndex] || room.description.length <= 100
                  ? room.description
                  : `${room.description.slice(0, 100)}...`}
                {room.description.length > 100 && (
                  <button
                    onClick={() => toggleDescription(roomIndex)}
                    className="text-indigo-500 ml-2 hover:underline"
                  >
                    {expandedIndexes[roomIndex] ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
              <p className="text-indigo-500 font-bold mt-3">₹1000/Night</p>
              <button
                className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300"
                onClick={() => handleSubmit(room)}
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
          <FaHotel className="text-indigo-500 mr-3" /> {/* Hotel icon */}
          About <span className="text-indigo-500 ml-2">{hotel.hotelName}</span>
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          {hotel.hotelName} offers a perfect blend of comfort and luxury,
          ensuring an unforgettable stay. Whether you're here for a weekend
          getaway or a business trip, we provide exceptional services and
          world-class amenities to meet all your needs. Our commitment is to
          make your stay as delightful as possible.
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={closeModal}
            >
              ✕
            </button>
            <Slider
              {...carouselSettings}
              initialSlide={initialImageIndex}
              className="rounded-lg"
            >
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
    </div>
  );
};

export default Details;
