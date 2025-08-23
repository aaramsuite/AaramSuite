const express = require("express");
const { createPayment, getPaymentsByHotel } = require("../controllers/paymentController");
const router = express.Router();

router.post("/", createPayment);
router.get("/", getPaymentsByHotel);

module.exports = router;
