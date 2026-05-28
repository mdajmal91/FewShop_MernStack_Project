const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProdById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const multer = require("multer");

const upload = multer({
  dest: "uploads/",
});

// GET all products + CREATE product
router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    admin,
    upload.single("image"),
    createProduct
  );

// GET single + UPDATE + DELETE
router
  .route("/:id")
  .get(getProdById)
  .put(
    protect,
    admin,
    upload.single("image"),
    updateProduct
  )
  .delete(
    protect,
    admin,
    deleteProduct
  );

module.exports = router;