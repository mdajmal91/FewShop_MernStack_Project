const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get Product By ID
const getProdById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);

    if (!prod) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(prod);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Create Product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    let imageUrl = "";

    // Upload image if file exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const prod = await Product.findById(req.params.id);

    if (!prod) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    prod.name = name || prod.name;
    prod.description = description || prod.description;
    prod.price = price || prod.price;
    prod.category = category || prod.category;
    prod.stock = stock || prod.stock;

    // Update image if new file uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      prod.imageUrl = result.secure_url;
    }

    const updatedProduct = await prod.save();

    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);

    if (!prod) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get Similar Products
const getSimilarProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Find products in the same category, excluding the current product
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // Exclude current product
    }).limit(4); // Limit to 4 similar products

    res.json(similarProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProducts,
  getProdById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSimilarProducts,
};
