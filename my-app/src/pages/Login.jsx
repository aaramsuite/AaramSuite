import React, { useState } from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { loginRoute } from '../utils/APIRoutes';
import axios from "axios"

const Login = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const { data } = await axios.post(loginRoute, {
          number: number,   // Ensure the key names and values are correct
          password: password
        }, {
          headers: {
            'Content-Type': 'application/json'   // Make sure to set the correct content type
          }
        });
  
        if (data.status === false) {
          toast.error(data.msg);
        } else if (data.status === true) {
          toast.success(data.msg);
          localStorage.setItem("hotel-user", JSON.stringify(data.user));
          navigate("/home");
        }
      } catch (error) {
        // console.error("Error during login:", error);
        toast.error("Login failed. Please try again later.");
      }
    }
  };
  
  
  const handleValidation = () => {
    // const { number, password } = values;
    if (!number || !password) {
      toast.error("Email and Password are required");
      return false;
    }
    return true;
  };

  return (
    <>
      {/* Navbar Container */}
      <div className="fixed top-10 left-4 right-4 z-10">
        <Navbar />
      </div>

      {/* Login Form */}
      <div className="min-h-screen bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] flex items-center justify-center py-10 px-4 pt-20">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login Form</h1>

          <div className="flex flex-col gap-4">
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
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>

          <p className="text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-600 underline decoration-1 hover:cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
