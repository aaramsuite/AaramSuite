const User = require("../model/userModel");
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

// Get logged-in user profile
module.exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.query.id;
    const number = req.query.number;

    if (!userId && !number) {
      return res.status(400).json({ message: "User ID or Phone number required" });
    }

    let user;
    if (userId) {
      user = await User.findOne({ userId: parseInt(userId) }).select("-password");
    } else if (number) {
      user = await User.findOne({ number }).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user profile
module.exports.updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.body; // Or req.user if using JWT auth
    const { name, number, age } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { name, number, age },
      { new: true } // return updated document
    ).select("-password"); // hide password

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    next(err);
  }
};
