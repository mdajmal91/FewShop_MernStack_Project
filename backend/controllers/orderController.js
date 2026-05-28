const Order = require("../model/Order");

// Create New Order
exports.createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
      paidAt: paymentMethod === "COD" ? null : Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Logged In User Orders
exports.myOrders = async (req, res) => {
  try {
    // req.user._id auth middleware se aayega
    const orders = await Order.find({ user: req.user._id }).populate("orderItems.product");

    if (!orders) {
      return res.status(404).json({ success: false, message: "Koi order nahi mila." });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching my orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};