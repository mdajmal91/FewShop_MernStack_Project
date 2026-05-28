const Cart = require("../model/Cart"); // Ensure Cart.js exists in backend/models

// Update item quantity in cart
exports.updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Yeh auth middleware se aayega

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart nahi mila." });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Agar quantity 0 hai toh product remove kar do
        cart.items.splice(itemIndex, 1);
      } else {
        // Quantity update karo
        cart.items[itemIndex].quantity = quantity;
      }

      const updatedCart = await cart.save();
      // Populating product details for the frontend
      const populatedCart = await updatedCart.populate("items.product");
      res.status(200).json(populatedCart);
    } else {
      res.status(404).json({ message: "Product cart mein nahi mila." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};