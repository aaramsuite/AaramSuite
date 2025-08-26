import React, { useEffect, useState,useRef } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchStarted = useRef(false);

  useEffect(() => {
    if (fetchStarted.current) return; // prevent duplicate fetch
    fetchStarted.current = true;

    const storedUser = JSON.parse(localStorage.getItem("hotel-user"));
    if (!storedUser){
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8000/api/bookings/user?userId=${storedUser.userId}`)
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your bookings...</p>;

  return (
    <div className="bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] min-h-screen py-10 px-4">
      <Navbar />
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 mt-10">
        My <span className="text-indigo-500">Bookings</span>
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">
        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found.</p>
        ) : (
          bookings.map((b, i) => (
            <div
              key={i}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Hotel ID: {b.hotelId}
              </h2>
              <p className="text-gray-600">Room ID: {b.roomId}</p>
              <p className="text-gray-600">Guests: {b.guests}</p>
              <p className="text-gray-600">
                Check-In: {new Date(b.checkIn).toDateString()}
              </p>
              <p className="text-gray-600">
                Check-Out: {new Date(b.checkOut).toDateString()}
              </p>
              <p className="text-indigo-500 font-bold">Status: {b.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
