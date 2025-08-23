import React from "react";
import "./index.css"
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HotelRegistration from "./pages/HotelRegistration"
import Details from "./pages/Details";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

function App() {
  return (
   <>
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        {/* Define the route for the Register page */}
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<Details/>} />
        <Route path="/hotelRegistration" element={<HotelRegistration/>} />
      </Routes>
    </Router>
    <ToastContainer
        position="top-right" // Change position (e.g., 'top-left', 'bottom-right')
        autoClose={3000} // Set auto close delay in milliseconds
        hideProgressBar={false} // Show or hide the progress bar
        newestOnTop={false} // Show the newest toast on top
        closeOnClick // Close when clicked
        rtl={false} // Set text direction (right-to-left)
        pauseOnFocusLoss // Pause when the app loses focus
        draggable // Allow drag to dismiss
        pauseOnHover // Pause toast on hover
        theme="colored" // Choose theme ('light', 'dark', 'colored')
      />
  </>
  );
}

export default App;
