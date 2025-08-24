import React, { useState, useEffect } from "react";
import axios from "axios";

const OwnerDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [hotelCity, setHotelCity] = useState("");

  const owner = JSON.parse(localStorage.getItem("hotel-owner"));

  const fetchHotels = async () => {
    const res = await axios.get(`http://localhost:8000/api/hotels?ownerId=${owner.ownerId}`);
    setHotels(res.data);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleAddHotel = async () => {
    const res = await axios.post("http://localhost:8000/api/owner/hotel", {
      ownerId: owner.ownerId,
      hotelName,
      hotelCity,
      hotelImages: []
    });
    alert("Hotel added!");
    fetchHotels();
  };

  return (
    <div>
      <h1>Welcome {owner.name}</h1>
      <h2>Add Hotel</h2>
      <input placeholder="Hotel Name" value={hotelName} onChange={e => setHotelName(e.target.value)} />
      <input placeholder="Hotel City" value={hotelCity} onChange={e => setHotelCity(e.target.value)} />
      <button onClick={handleAddHotel}>Add</button>

      <h2>Your Hotels</h2>
      {hotels.map(h => (
        <div key={h.hotelId}>
          <h3>{h.hotelName} ({h.hotelCity})</h3>
        </div>
      ))}
    </div>
  );
};

export default OwnerDashboard;
