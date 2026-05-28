const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

// Import Models
const User = require("./User");
const Product = require("./Product");
// Ensure this model file exists or comment out if not used
const Order = require("./Order"); 

// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fewshop");
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// Dummy Users Data
const dummyUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    verified: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
    role: "user",
    verified: true,
  },
  {
    name: "Sarah Smith",
    email: "sarah@example.com",
    password: "sarah123",
    role: "user",
    verified: true,
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    password: "mike123",
    role: "user",
    verified: false,
  },
];

// Dummy Products Data
const dummyProducts = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 79.99,
    category: "Electronics",
    stock: 50,
    imageUrl: "https://placehold.co/300x300?text=Wireless+Headphones",
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "USB-C Charging Cable",
    description: "Durable USB-C cable for fast charging",
    price: 12.99,
    category: "Accessories",
    stock: 200,
    imageUrl: "https://placehold.co/300x300?text=USB-C+Cable",
    rating: 4.0,
    numReviews: 45,
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with 2.4GHz receiver",
    price: 29.99,
    category: "Electronics",
    stock: 75,
    imageUrl: "https://placehold.co/300x300?text=Wireless+Mouse",
    rating: 4.2,
    numReviews: 28,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with custom switches",
    price: 99.99,
    category: "Electronics",
    stock: 30,
    imageUrl: "https://placehold.co/300x300?text=Mechanical+Keyboard",
    rating: 4.7,
    numReviews: 35,
  },
  {
    name: "Phone Stand",
    description: "Adjustable phone stand for desk",
    price: 15.99,
    category: "Accessories",
    stock: 120,
    imageUrl: "https://placehold.co/300x300?text=Phone+Stand",
    rating: 3.8,
    numReviews: 18,
  },
  {
    name: "Portable SSD",
    description: "1TB portable solid state drive with USB 3.1",
    price: 129.99,
    category: "Storage",
    stock: 25,
    imageUrl: "https://placehold.co/300x300?text=Portable+SSD",
    rating: 4.6,
    numReviews: 52,
  },
  {
    name: "Screen Protector",
    description: "Tempered glass screen protector for phones",
    price: 9.99,
    category: "Accessories",
    stock: 300,
    imageUrl: "https://placehold.co/300x300?text=Screen+Protector",
    rating: 3.9,
    numReviews: 22,
  },
  {
    name: "Laptop Stand",
    description: "Aluminum laptop stand for better ergonomics",
    price: 39.99,
    category: "Accessories",
    stock: 60,
    imageUrl: "https://placehold.co/300x300?text=Laptop+Stand",
    rating: 4.4,
    numReviews: 31,
  },
  {
    name: "Webcam HD",
    description: "1080p HD webcam with built-in microphone",
    price: 49.99,
    category: "Electronics",
    stock: 40,
    imageUrl: "https://placehold.co/300x300?text=Webcam+HD",
    rating: 4.1,
    numReviews: 24,
  },
  {
    name: "USB Hub 7-Port",
    description: "Multi-port USB 3.0 hub for expanding connectivity",
    price: 34.99,
    category: "Accessories",
    stock: 85,
    imageUrl: "https://placehold.co/300x300?text=USB+Hub",
    rating: 4.3,
    numReviews: 19,
  },
];

// Seed Database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Hash passwords
    const hashedUsers = await Promise.all(
      dummyUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ ${createdUsers.length} users created`);

    // Insert products
    const createdProducts = await Product.insertMany(dummyProducts);
    console.log(`✅ ${createdProducts.length} products created`);

    // Create dummy orders
    const dummyOrders = [
      {
        user: createdUsers[1]._id, // John Doe
        items: [
          {
            productID: createdProducts[0]._id,
            qty: 1,
            price: createdProducts[0].price,
          },
          {
            productID: createdProducts[2]._id,
            qty: 2,
            price: createdProducts[2].price,
          },
        ],
        totalAmount: createdProducts[0].price + createdProducts[2].price * 2,
        address: {
          fullname: "John Doe",
          street: "123 Main Street",
          city: "New York",
          postalCode: "10001",
          country: "USA",
        },
        paymentID: "pay_1234567890",
        status: "pending",
      },
      {
        user: createdUsers[2]._id, // Sarah Smith
        items: [
          {
            productID: createdProducts[3]._id,
            qty: 1,
            price: createdProducts[3].price,
          },
        ],
        totalAmount: createdProducts[3].price,
        address: {
          fullname: "Sarah Smith",
          street: "456 Oak Avenue",
          city: "Los Angeles",
          postalCode: "90001",
          country: "USA",
        },
        paymentID: "pay_1234567891",
        status: "shipped",
      },
      {
        user: createdUsers[1]._id, // John Doe
        items: [
          {
            productID: createdProducts[5]._id,
            qty: 1,
            price: createdProducts[5].price,
          },
          {
            productID: createdProducts[1]._id,
            qty: 3,
            price: createdProducts[1].price,
          },
        ],
        totalAmount: createdProducts[5].price + createdProducts[1].price * 3,
        address: {
          fullname: "John Doe",
          street: "789 Pine Road",
          city: "Chicago",
          postalCode: "60601",
          country: "USA",
        },
        paymentID: "pay_1234567892",
        status: "delivered",
      },
      {
        user: createdUsers[3]._id, // Mike Johnson
        items: [
          {
            productID: createdProducts[4]._id,
            qty: 2,
            price: createdProducts[4].price,
          },
        ],
        totalAmount: createdProducts[4].price * 2,
        address: {
          fullname: "Mike Johnson",
          street: "321 Elm Street",
          city: "Houston",
          postalCode: "77001",
          country: "USA",
        },
        paymentID: "pay_1234567893",
        status: "pending",
      },
    ];

    const createdOrders = await Order.insertMany(dummyOrders);
    console.log(`✅ ${createdOrders.length} orders created`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📋 Summary:");
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Products: ${createdProducts.length}`);
    console.log(`   - Orders: ${createdOrders.length}`);
    console.log("\n👤 Test Accounts:");
    console.log("   Admin: admin@example.com / admin123");
    console.log("   User: john@example.com / john123");
    console.log("   User: sarah@example.com / sarah123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(() => seedDatabase());
