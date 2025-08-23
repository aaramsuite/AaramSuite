const express = require("express");
const { register, login } = require("../controllers/userController"); // Ensure this path is correct
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// console.log("i am in loginRoute")
module.exports = router;
