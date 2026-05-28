import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { formatCurrency } from '../components/currency';
import '../style/global.css';
import '../style/confirmorder.css';

const ConfirmOrder = () => {
  const { user } = useContext(AuthContext);
  const { cartItems } = useSelector((state) => state.cart || { cartItems: [] });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // मान लीजिए एड्रेस और पेमेंट जानकारी Checkout पेज से आ रही है
  // हम इसे localStorage या navigation state से ले सकते हैं
  const shippingInfo = JSON.parse(localStorage.getItem('fewshop_saved_address')) || {};
  const paymentMethod = "UPI / Cash on Delivery"; 

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shippingCharges = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const totalAmount = subtotal + shippingCharges + tax;

  const handleFinalOrder = async () => {
    // यहाँ ऑर्डर प्लेस करने का API लॉजिक आएगा
    const orderData = {
        items: cartItems,
        shippingAddress: shippingInfo,
        totalAmount,
        paymentMethod
    };

    // सफलता के बाद:
    dispatch({ type: 'cart/clearCart' });
    navigate('/order-success', { state: { order: { ...orderData, _id: "ORD" + Date.now() } } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="saffron-orange-page flex-center">
        <div className="profile-form-container text-center">
          <h2>Your cart is empty!</h2>
          <Link to="/shop" className="btn btn-primary mt-3">Go Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="saffron-orange-page">
      <div className="container py-4">
        {/* PROGRESS BAR */}
        <div className="checkout-progress mb-5">
          <div className="progress-step completed"><div className="step-circle">✓</div><span className="step-label">Cart</span><div className="progress-line"></div></div>
          <div className="progress-step completed"><div className="step-circle">✓</div><span className="step-label">Address</span><div className="progress-line"></div></div>
          <div className="progress-step active"><div className="step-circle">3</div><span className="step-label">Confirm</span></div>
        </div>

        <h1 className="text-white text-center fw-bold mb-5" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          ✔️ Review Your Order
        </h1>

        <div className="confirm-order-grid">
          {/* LEFT: Shipping & Items */}
          <div className="confirm-left">
            <div className="confirm-box mb-4">
              <h3 className="h5 border-bottom pb-2 mb-3">📍 Shipping Information</h3>
              <p className="mb-1"><strong>Name:</strong> {shippingInfo.fullname || user?.name}</p>
              <p className="mb-1"><strong>Address:</strong> {shippingInfo.street}, {shippingInfo.city}, {shippingInfo.postalCode}</p>
              <p className="mb-0"><strong>Phone:</strong> {shippingInfo.phone || "Not Provided"}</p>
            </div>

            <div className="confirm-box">
              <h3 className="h5 border-bottom pb-2 mb-3">🛒 Order Items ({cartItems.length})</h3>
              <div className="confirm-items-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="confirm-item-row">
                    <img src={item.imageUrl} alt={item.name} className="confirm-item-img" />
                    <div className="confirm-item-info">
                      <Link to={`/products/${item._id}`} className="text-dark fw-bold text-decoration-none">
                        {item.name}
                      </Link>
                      <p className="text-muted small mb-0">{item.quantity} x {formatCurrency(item.price)}</p>
                    </div>
                    <div className="confirm-item-total fw-bold">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Totals */}
          <div className="confirm-right">
            <div className="confirm-box sticky-top" style={{ top: '100px' }}>
              <h3 className="h5 border-bottom pb-2 mb-3">💰 Price Details</h3>
              
              <div className="price-row d-flex justify-content-between mb-2">
                <span>Price ({cartItems.length} items)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="price-row d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span className={shippingCharges === 0 ? "text-success fw-bold" : ""}>
                  {shippingCharges === 0 ? "FREE" : formatCurrency(shippingCharges)}
                </span>
              </div>

              <div className="price-row d-flex justify-content-between mb-2">
                <span>Tax (GST 5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>

              <hr />

              <div className="price-row d-flex justify-content-between h4 fw-bold mb-4">
                <span>Total Amount</span>
                <span className="text-primary">{formatCurrency(totalAmount)}</span>
              </div>

              <div className="payment-summary bg-light p-3 rounded mb-4 text-center">
                <span className="text-muted small text-uppercase d-block mb-1">Payment Method</span>
                <span className="fw-bold">{paymentMethod}</span>
              </div>

              <button 
                onClick={handleFinalOrder}
                className="btn btn-primary w-100 py-3 fw-bold shadow-lg confirm-btn"
                style={{ background: 'linear-gradient(90deg, #FF8C00, #FF4500)', border: 'none' }}
              >
                🚀 Confirm & Pay Now
              </button>
              
              <p className="text-center text-muted small mt-3">
                By clicking confirm, you agree to our terms of service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;