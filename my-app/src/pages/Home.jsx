import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  let user = localStorage.getItem("hotel-user");
  console.log("Logged in user:", user);

  // Fetch hotels from backend
  useEffect(() => {
  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/hotels");
      setHotels(res.data || []);
      console.log("Hotels from API:", res.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };
  fetchHotels();
}, []);


const handleNavigate = (hotel) => {
  navigate(`/details/${hotel.hotelId}`);
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700">Loading hotels...</h2>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] min-h-screen py-10 px-4">
      <Navbar/>
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 mt-10">
        Welcome to <span className="text-indigo-500">Brothers Group of Hotels</span>
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">
            No hotels available. Please check back later.
          </p>
        ) : (
          hotels.map((hotel) => (
            <div
              key={hotel.hotelId}
              className="bg-white bg-opacity-80 hover:bg-opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{hotel.hotelName}</h2>
                <p className="text-lg text-gray-600 mb-4">{hotel.hotelCity}</p>

                {hotel.hotelImages && hotel.hotelImages.length > 0 && (
                  <img
                    src={hotel.hotelImages[0]}
                    alt={hotel.hotelName}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}

                <button
                  className="absolute bottom-6 right-6 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition-all duration-300"
                  onClick={() => handleNavigate(hotel)}
                >
                  Visit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
