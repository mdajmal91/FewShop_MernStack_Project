const express = require("express");
const router = express.Router();
const { createOrder, myOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware"); // Or isAuthenticatedUser

// Create Order (Handles both COD and Online)
router.route("/").post(protect, createOrder);

// Get Logged In User Orders
router.route("/myorders").get(protect, myOrders);

module.exports = router;