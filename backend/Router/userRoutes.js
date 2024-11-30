const express = require("express");
const {
  Register,
  loginAdmin,
  loginUser,
} = require("../controller/userController");

const router = express.Router();

// Define routes for user registration and login
router.post("/register", Register);
router.post("/loginAdmin", loginAdmin);
router.post("/loginUser", loginUser);

module.exports = router; // Ensure the router is being exported
