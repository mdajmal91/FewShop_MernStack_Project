const express = require("express");
const { processPayment, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/process", protect, processPayment);
router.post("/verify", protect, verifyPayment);

module.exports = router;