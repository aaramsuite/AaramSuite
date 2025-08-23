import React, { useState } from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import Navbar from './Navbar';
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword || password==="") {
      toast.error("Passwords and Confirm Password should match");
      return;
    }

    if (!/^\d{10}$/.test(number)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    if (age < 18) {
      toast.error("You must be at least 18 years old to register");
      return;
    }

    setLoading(true); // Set loading state
    const {data} = await axios.post(registerRoute,{
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'JWT fefege...'
      },
      name,
      password,
      number,
      age,
    });
    if (data.status === false) {
      toast.error(data.msg);
    }
    if (data.status === true) {
      localStorage.setItem("hotel-user", JSON.stringify(data.user));
      toast.success(data.msg);
      navigate('/login');
    }
    setLoading(false); // Reset loading state
  };

  return (
    <div className="bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] min-h-screen py-10 px-4">
      {/* Navbar */}
      <Navbar />

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 mt-10">
        Welcome to <span className="text-indigo-500">Brothers Group</span> Registration
      </h1>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Registration Form</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Your Name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Enter Your Age"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* <button
            type="submit"
            className="mt-6 w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Register
          </button> */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full bg-indigo-500 text-white py-3 rounded-lg transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-600"
            }`}
            >
            {loading ? "Processing..." : "Register"}
          </button>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-indigo-500 underline decoration-1 hover:cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
