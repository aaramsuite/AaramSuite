const express = require("express");
const { register, login } = require("../controllers/userController");
const { getProfile,updateProfile } = require("../controllers/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;
