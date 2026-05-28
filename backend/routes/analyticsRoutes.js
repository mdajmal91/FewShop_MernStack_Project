const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  getAdminAnalytics,
  getOrderAnalytics,
  getProductAnalytics,
  getUserAnalytics,
  getRevenueAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/", protect, admin, getAdminAnalytics);
router.get("/orders", protect, admin, getOrderAnalytics);
router.get("/products", protect, admin, getProductAnalytics);
router.get("/users", protect, admin, getUserAnalytics);
router.get("/revenue", protect, admin, getRevenueAnalytics);

module.exports = router;

