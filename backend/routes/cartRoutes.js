const express = require("express");
const router = express.Router();
const { updateCartQuantity } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware"); // Aapka auth middleware

// Route: PUT /api/cart/update
// Desc:  Update quantity of an item in cart
router.put("/update", protect, updateCartQuantity);

module.exports = router;