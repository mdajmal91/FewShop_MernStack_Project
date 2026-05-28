import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../components/currency';
import '../style/cart.css';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart || { cartItems: [] });
  const dispatch = useDispatch();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'cart/updateQuantity',
      payload: { productId, quantity: newQuantity }
    });
  };

  const handleRemoveItem = (productId) => {
    dispatch({
      type: 'cart/removeFromCart',
      payload: productId
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = 0;
  const totalPrice = subtotal + tax;

  // ── Empty Cart ──
  if (cartItems.length === 0) {
    return (
      <div className="cart-page flex-center">
        <div className="empty-cart-box">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty!</h2>
          <p>Add some products to get started.</p>
          <Link to="/" className="btn-checkout" style={{ textDecoration: 'none', display: 'inline-flex', width: 'auto', padding: '14px 32px' }}>
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container py-5">

        {/* Page Heading */}
        <h1 className="cart-heading">
          🛒 Your Shopping Cart
          <span className="cart-count">({cartItems.length})</span>
        </h1>

        <div className="cart-layout">

          {/* ── LEFT: Cart Items ── */}
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item-card mb-3">

                {/* Product Image */}
                <img src={item.imageUrl} alt={item.name} />

                {/* Product Details */}
                <div className="cart-item-details">
                  <h5>{item.name}</h5>
                  <p>{formatCurrency(item.price)} × {item.quantity}</p>
                  <p className="item-total">
                    Total: {formatCurrency(item.price * item.quantity)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>−</button>
                    <span className="qty-display">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="btn-remove"
                  onClick={() => handleRemoveItem(item._id)}
                  title="Remove item"
                >
                  🗑
                </button>

              </div>
            ))}
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="cart-summary-section">
            <div className="cart-summary-card sticky-top">

              {/* Header */}
              <h4 className="summary-heading">
                <span className="summary-icon">▬</span>
                Order Summary
              </h4>

              {/* Subtotal */}
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {/* Shipping */}
              <div className="summary-row">
                <span>Shipping</span>
                <span className="text-free-shipping">Free</span>
              </div>

              {/* Tax */}
              <div className="summary-row">
                <span>Tax</span>
                <span>₹0.00</span>
              </div>

              <hr className="summary-divider" />

              {/* Total */}
              <div className="summary-total-row">
                <span className="label">Total</span>
                <span className="amount">{formatCurrency(totalPrice)}</span>
              </div>

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="trust-badge-item">
                  <span className="badge-icon">🛡️</span>
                  100% Secure Payments
                </div>
                <div className="trust-badge-item">
                  <span className="badge-icon">🚚</span>
                  Fast Delivery Available
                </div>
                <div className="trust-badge-item">
                  <span className="badge-icon">⚡</span>
                  Premium Customer Support
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout" className="btn-checkout">
                💳 Proceed To Checkout
              </Link>

              {/* Secure Note */}
              <p className="secure-note">
                All transactions are secure and encrypted for your safety.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;