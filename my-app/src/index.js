// Import the necessary slick slider CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import React and other necessary components
import React from 'react';
// import Slider from 'react-slick';
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure this imports the Tailwind styles
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
