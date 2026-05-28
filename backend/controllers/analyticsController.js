const Order = require("../model/Order");
const User = require("../model/User");
const Product = require("../model/Product");

const getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find({});

    const totalEarnings = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalEarnings,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getOrderAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({});
    
    const orderStats = {
      pending: orders.filter(o => o.status === "pending").length,
      shipped: orders.filter(o => o.status === "shipped").length,
      delivered: orders.filter(o => o.status === "delivered").length,
    };

    const monthlyEarnings = {};
    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString("default", { month: "long" });
      monthlyEarnings[month] = (monthlyEarnings[month] || 0) + (order.totalPrice || 0);
    });

    res.status(200).json({
      success: true,
      data: {
        orderStats,
        monthlyEarnings,
        totalOrders: orders.length,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getProductAnalytics = async (req, res) => {
  try {
    const products = await Product.find({});
    const orders = await Order.find({}).populate("orderItems.product");

    const productSales = {};
    orders.forEach(order => {
      if (order.orderItems) {
        order.orderItems.forEach(item => {
          if (item.product) {
            const productId = item.product._id.toString();
            productSales[productId] = (productSales[productId] || 0) + item.quantity;
          }
        });
      }
    });

    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([productId, sales]) => ({
        productId,
        sales,
      }));

    res.status(200).json({
      success: true,
      data: {
        totalProducts: products.length,
        topProducts,
        productSales,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getUserAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const users = await User.find({});

    const usersByRole = {
      admin: users.filter(u => u.role === "admin").length,
      user: users.filter(u => u.role === "user").length,
    };

    const userSignups = {};
    users.forEach(user => {
      const month = new Date(user.createdAt).toLocaleString("default", { month: "long" });
      userSignups[month] = (userSignups[month] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        usersByRole,
        userSignups,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getRevenueAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({});

    const revenue = {
      today: 0,
      thisMonth: 0,
      thisYear: 0,
      total: 0,
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const yearStart = new Date(today.getFullYear(), 0, 1);

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const amount = order.totalPrice || 0;

      revenue.total += amount;

      if (orderDate >= today) {
        revenue.today += amount;
      }
      if (orderDate >= monthStart) {
        revenue.thisMonth += amount;
      }
      if (orderDate >= yearStart) {
        revenue.thisYear += amount;
      }
    });

    res.status(200).json({
      success: true,
      data: revenue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminAnalytics,
  getOrderAnalytics,
  getProductAnalytics,
  getUserAnalytics,
  getRevenueAnalytics,
};
