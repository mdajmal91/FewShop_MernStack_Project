import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Disclaimer from './pages/Disclaimer';
import ReturnPolicy from './pages/ReturnPolicy';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Orders from './pages/Orders';
import ConfirmOrder from './pages/ConfirmOrder';
import Wishlist from './pages/Wishlist';
import Shop from './pages/Shop';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';

import {
  AuthProvider
} from './context/AuthContext';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/returns" element={<ReturnPolicy />} />
        {/* Product */}
        <Route path="/products/:id" element={<ProductDetails />} />
        {/* Cart */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        {/* 404 */}
        <Route
          path="*"
          element={
            <div
              style={{
                textAlign: 'center',
                padding: '100px',
              }}
            >
              <h1>404</h1>
              <h2>Route Not Found</h2>
            </div>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;