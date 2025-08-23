const Payment = require("../models/paymentModel");

module.exports.createPayment = async (req, res, next) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ message: "Payment recorded", payment });
  } catch (err) {
    next(err);
  }
};

module.exports.getPaymentsByHotel = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate("bookingId");
    res.json(payments);
  } catch (err) {
    next(err);
  }
};
