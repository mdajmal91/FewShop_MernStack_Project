const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');

// Handle Uncaught exceptions (e.g., using a variable that isn't defined)
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
});

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend
    credentials: true
}));

// Import Routes (Ensure these files exist)
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Error Middleware (Must be last)
app.use(errorMiddleware);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fewshop')
    .then(con => {
        console.log(`MongoDB Connected with host: ${con.connection.host}`);
    })
    .catch(err => {
        console.error(`Database connection failed: ${err.message}`);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});

// Handle Unhandled Promise rejections (e.g., DB connection issues)
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    });
});