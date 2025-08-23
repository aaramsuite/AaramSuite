import React from 'react';
import { hotels } from "./Hotels";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();
  let user = localStorage.getItem("hotel-user");
  console.log(user);
  const handleNavigate = (hotel) => {
    // console.log(hotel)
    navigate('/details', { state: { hotel } }); // Pass hotel data to Details page
  };

  return (
    <div className="bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] min-h-screen py-10 px-4">
      <Navbar/>
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 mt-10">
        Welcome to <span className="text-indigo-500">Brothers Group of Hotels</span>
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          hotels.map((hotel, index) => (
            <div key={index} className="bg-white bg-opacity-80 hover:bg-opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{hotel.hotelName}</h2>
                <p className="text-lg text-gray-600 mb-4">{hotel.hotelCity}</p>
                <button
                  className="absolute bottom-6 right-6 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition-all duration-300"
                  onClick={() => handleNavigate(hotel)}  // Navigate when button is clicked
                >
                  Visit
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
