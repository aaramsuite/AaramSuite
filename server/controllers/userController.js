const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { name, password, number, age } = req.body;
    const existingUser = await User.findOne({ number });
    if (existingUser) return res.status(400).json({ msg: "User already exists", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: hashedPassword, number, age });

    return res.json({ user: { ...user._doc, password: undefined }, status: true });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { number, password } = req.body;
    const user = await User.findOne({ number });
    if (!user) return res.status(400).json({ msg: "Incorrect credentials", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ msg: "Incorrect credentials", status: false });

    return res.json({ user: { ...user._doc, password: undefined }, status: true });
  } catch (err) {
    next(err);
  }
};
