const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  loginWithEmail,
  updateUserProfile
} = require("../controllers/authController");

const {
  protect
} = require("../middleware/authMiddleware");

// Register
router.post(
  "/register",
  registerUser
);

// Login
router.post(
  "/login",
  loginUser
);

// Email Login
router.post(
  "/login-with-email",
  loginWithEmail
);

// Profile Update
router.put(
  "/profile",
  protect,
  updateUserProfile
);

module.exports = router;