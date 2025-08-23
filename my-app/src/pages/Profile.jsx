import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", number: "", age: "" });

  // Fetch user profile
  useEffect(() => {
    const storedUser = localStorage.getItem("hotel-user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      axios
        .get(`http://localhost:8000/api/auth/profile?number=${parsedUser.number}`)
        .then((res) => {
          setUser(res.data);
          setFormData({
            name: res.data.name,
            number: res.data.number,
            age: res.data.age,
          });
        })
        .catch(() => setUser(null));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8000/api/auth/profile", {
        userId: user.userId,
        ...formData,
      });

      setUser(res.data.user);
      localStorage.setItem("hotel-user", JSON.stringify(res.data.user));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700">
          No user data found. Please login again.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] min-h-screen py-10 px-4">
      <Navbar />
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 mt-10">
        Welcome, <span className="text-indigo-500">{user.name}</span>
      </h1>

      <div className="max-w-3xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
        {!isEditing ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Username:</strong> {user.name}</p>
              <p><strong>Phone:</strong> {user.number}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>User ID:</strong> {user.userId}</p>
            </div>
            <div className="mt-8 flex justify-between">
              <button
                className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition-all duration-300"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all duration-300"
                onClick={() => {
                  localStorage.removeItem("hotel-user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-all duration-300"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
