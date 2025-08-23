const express = require("express");
const { hotelRegister } = require("../controllers/hotelController"); // Ensure this path is correct
const router = express.Router();

router.post("/hotelRegistration", hotelRegister);
// console.log("i am in loginRoute")
module.exports = router;
