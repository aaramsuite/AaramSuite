import React, { useState } from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { loginRoute, ownerLoginRoute } from '../utils/APIRoutes';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role = user

const handleSubmit = async (e) => {
  e.preventDefault();
  if (handleValidation()) {
    try {
      // Pick correct API route
      const route = role === "user" ? loginRoute : ownerLoginRoute;

      // Send "number" for user, "phone" for owner
      const body = role === "user"
        ? { number, password }
        : { phone: number, password };

      const { data } = await axios.post(
        route,
        body,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!data.status) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);

        if (role === "user") {
          localStorage.setItem("hotel-user", JSON.stringify(data.user));
          navigate("/home");
        } else {
          localStorage.setItem("hotel-owner", JSON.stringify(data.owner));
          navigate("/owner/dashboard");
        }
      }
    } catch (error) {
      toast.error("Login failed. Please try again later.");
    }
  }
};


  const handleValidation = () => {
    if (!number || !password) {
      toast.error("Phone and Password are required");
      return false;
    }
    return true;
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-10 left-4 right-4 z-10">
        <Navbar />
      </div>

      {/* Login Form */}
      <div className="min-h-screen bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc] flex items-center justify-center py-10 px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>

          {/* Toggle role (User / Owner) */}
          <div className="flex justify-center mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-lg ${role === "user" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
              onClick={() => setRole("user")}
            >
              User
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-lg ${role === "owner" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
              onClick={() => setRole("owner")}
            >
              Hotel Owner
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Phone Number"
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
            Login as {role === "user" ? "User" : "Owner"}
          </button>

          {/* Always show register option */}
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-600 underline decoration-1 hover:cursor-pointer"
              onClick={() => navigate('/register', { state: { role } })}
            >
              Register as {role === "user" ? "User" : "Hotel Owner"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
