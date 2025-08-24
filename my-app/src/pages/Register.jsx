import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { registerRoute, ownerRegisterRoute } from "../utils/APIRoutes";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // if coming from login, pick role
  const initialRole = location.state?.role === "owner";
  const [isOwner, setIsOwner] = useState(initialRole);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (location.state?.role === "owner") {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const route = isOwner ? ownerRegisterRoute : registerRoute;
      const body = isOwner
        ? { name, phone: number, password } // owner schema uses `phone`
        : { name, number, password, age: Number(age) };

      const { data } = await axios.post(route, body);

      if (data.status) {
        toast.success(data.msg);
        navigate("/login");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#d1c4e9] via-[#f8bbd0] to-[#b3e5fc]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isOwner ? "Owner Registration" : "User Registration"}
        </h2>

        {/* Toggle */}
        <div className="flex justify-center mb-4 gap-2">
          <button
            type="button"
            onClick={() => setIsOwner(false)}
            className={`px-4 py-2 rounded ${!isOwner ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setIsOwner(true)}
            className={`px-4 py-2 rounded ${isOwner ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Owner
          </button>
        </div>

        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        
        {/* Age only for users */}
        {!isOwner && (
          <input
            className="border p-2 w-full mb-3"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        )}

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="bg-indigo-500 text-white w-full py-2 rounded hover:bg-indigo-600 transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
