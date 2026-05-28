const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  createOrder,
  getOrders,
  getOrderById,
  myOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/myorders").get(protect, myOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
