import React from 'react';
import logo from './logo.jpg.webp';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("hotel-user"); // check if logged in

  const toggleMenu = () => {
    const menu = document.getElementById('menu-dropdown');
    menu.classList.toggle('hidden');
    menu.classList.toggle('animate-slide-down');
  };

  const handleLogout = () => {
    localStorage.removeItem("hotel-user");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#f8bbd0] via-[#d1c4e9] to-[#b3e5fc] shadow-md">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-lg"
            />
            <span className="text-xl font-bold text-gray-800">
              Brothers Group
            </span>
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="md:hidden">
            <button
              id="menu-toggle"
              className="text-gray-800 focus:outline-none hover:text-indigo-600 transition-all"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex space-x-8 text-lg font-medium text-gray-600 items-center">
            <div
              className="cursor-pointer hover:text-indigo-600 transition-all duration-300"
              onClick={() => navigate('/home')}
            >
              Home
            </div>
            <div className="cursor-pointer hover:text-indigo-600 transition-all duration-300">
              Notification
            </div>

            {user && (
              <>
                <div
                  className="cursor-pointer hover:text-indigo-600 transition-all duration-300"
                  onClick={() => navigate('/mybookings')}
                >
                  My Bookings
                </div>
                <div
                  className="cursor-pointer hover:text-indigo-600 transition-all duration-300"
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </div>
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Dropdown Menu for Small Screens */}
        <div
          id="menu-dropdown"
          className="hidden flex-col space-y-4 px-6 py-6 bg-gradient-to-r from-[#f3e5f5] to-[#e3f2fd] rounded-lg shadow-lg mx-4 my-2 animate-hidden"
        >
          <div
            className="cursor-pointer text-gray-800 text-center font-medium py-2 hover:bg-indigo-100 rounded-lg transition-all duration-300"
            onClick={() => navigate('/home')}
          >
            Home
          </div>
          <div className="cursor-pointer text-gray-800 text-center font-medium py-2 hover:bg-indigo-100 rounded-lg transition-all duration-300">
            Notification
          </div>

          {user && (
            <>
              <div
                className="cursor-pointer text-gray-800 text-center font-medium py-2 hover:bg-indigo-100 rounded-lg transition-all duration-300"
                onClick={() => navigate('/mybookings')}
              >
                My Bookings
              </div>
              <div
                className="cursor-pointer text-gray-800 text-center font-medium py-2 hover:bg-indigo-100 rounded-lg transition-all duration-300"
                onClick={() => navigate('/profile')}
              >
                Profile
              </div>
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
