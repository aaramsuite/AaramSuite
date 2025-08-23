const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelsRoute");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/aaramsuite")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(3000, () => console.log("Server running on port 3000"));
