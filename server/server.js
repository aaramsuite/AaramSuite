const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelsRoute");
require("dotenv").config();

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Increase URL-encoded payload limit

// API Routes
app.use("/api/auth", userRoutes);
app.use("/api/hotel", hotelRoutes);

// Sample Route to check server status
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.LOCAL_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
