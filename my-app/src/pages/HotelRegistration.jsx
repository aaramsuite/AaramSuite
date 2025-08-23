import React, { useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { hotelRegisterRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

const HotelRegistration = () => {
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });
  const [roomImages, setRoomImages] = useState([]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Convert images for each room
    const updatedRooms = await Promise.all(
      rooms.map(async (room) => ({
        title: room.title,
        price: room.price,
        images: await Promise.all(room.images.map(file => convertToBase64(file))), // Convert each image
      }))
    );
    // console.log("Room data : ",updatedRooms);
    const hotelData = {
      hotelName,
      hotelCity: hotelLocation,
      rooms: updatedRooms, // Now it's an array of rooms with converted images
    };
   console.log("Room data : ",updatedRooms);
    try {
      const response = await axios.post(hotelRegisterRoute, hotelData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data) {
        toast.success("Hotel registered successfully!");
        navigate('/home');
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Registration failed!");
    } finally {
      setLoading(false);
    }
  };
  
  

  const addRoom = () => {
    setShowModal(true);
    setEditingIndex(null);
    setRoomDetails({ title: "", description: "", price: "", images: [] });
    setRoomImages([]);
  };

  const handleRoomSubmit = () => {
    if (!roomDetails.title || !roomDetails.description || !roomDetails.price || roomImages.length === 0) {
      toast.error("Please fill in all fields!");
      return;
    }

    const newRoom = { ...roomDetails, images: roomImages };
    if (editingIndex !== null) {
      const updatedRooms = [...rooms];
      updatedRooms[editingIndex] = newRoom;
      setRooms(updatedRooms);
      toast.success("Room updated successfully");
    } else {
      setRooms([...rooms, newRoom]);
      toast.success("Room added successfully");
    }

    setShowModal(false);
    setRoomDetails({ title: "", description: "", price: "", images: [] });
    setRoomImages([]);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setRoomDetails(rooms[index]);
    setRoomImages(rooms[index].images);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
    toast.success("Room deleted successfully");
  };

  return (
    <div className="bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] min-h-screen py-10 px-4">
      <Navbar />
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 mt-10">
        Welcome to <span className="text-indigo-500">Brothers Group</span> Hotel Registration
      </h1>
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Hotel Name"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Hotel Location"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
              value={hotelLocation}
              onChange={(e) => setHotelLocation(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter Hotel Description"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
              value={hotelDescription}
              onChange={(e) => setHotelDescription(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow-lg flex flex-col sm:flex-row justify-between items-start gap-4"
              >
                <div>
                  <h3 className="font-bold text-xl text-blue-700">{room.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{room.description}</p>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {room.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(image)}
                        alt="Room"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-gray-800 mt-2">
                    Price: ₹{room.price}
                  </p>
                </div>
                <div className="flex gap-2 self-start">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addRoom}
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600"
          >
            Add Room
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-500 text-white py-3 rounded-lg mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-600"
            }`}
          >
            {loading ? "Processing..." : "Register Hotel"}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              {editingIndex !== null ? "Edit Room" : "Add Room"}
            </h2>
            <input
              type="text"
              placeholder="Room Title"
              className="border p-3 rounded w-full mb-3 focus:outline-none focus:border-blue-500"
              value={roomDetails.title}
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, title: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Room Price"
              className="border p-3 rounded w-full mb-3 focus:outline-none focus:border-blue-500"
              value={roomDetails.price}
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, price: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Room Description"
              className="border p-3 rounded w-full mb-3 focus:outline-none focus:border-blue-500"
              value={roomDetails.description}
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, description: e.target.value })
              }
              required
            />
            <input
              type="file"
              accept="image/*"
              multiple
              className="mb-3"
              onChange={(e) =>
                setRoomImages([...roomImages, ...Array.from(e.target.files)])
              }
            />
            <div className="flex gap-3 mb-4 flex-wrap">
              {roomImages.length > 0 &&
                Array.from(roomImages).map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="Room"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleRoomSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                {editingIndex !== null ? "Update" : "Add"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelRegistration;
