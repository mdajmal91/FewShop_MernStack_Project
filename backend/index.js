const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
});

// Database
const connectDB =
  require("./config/db");

// Routes
const authRoutes =
  require("./routes/authRoutes");

const productRoutes =
  require("./routes/productRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

const analyticsRoutes =
  require("./routes/analyticsRoutes");

const cartRoutes =
  require("./routes/cartRoutes");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// Home Route
app.get("/", (req, res) => {
  res.send(
    "FewShop Backend Running Successfully 🚀"
  );
});

// API Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

// Route Check Debug
app.get(
  "/api/test",
  (req, res) => {
    res.json({
      message:
        "API Working Properly"
    });
  }
);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      `Route not found: ${req.originalUrl}`
  });
});

// Global Error Middleware
app.use(errorMiddleware);

// Port
const PORT =
  process.env.PORT ||
  5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    });
});