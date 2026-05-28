import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatCurrency } from '../components/currency';
import '../style/global.css';

const OrderSuccess = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Get order data passed from Checkout

  if (!order) {
    return (
      <div className="container text-center py-5">
        <h2>No order details found.</h2>
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
    );
  }

  const isUPI = order.paymentMethod === 'UPI';

  return (
    <div className="saffron-orange-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="card shadow-lg p-4 p-md-5 bg-white rounded text-center mx-auto" style={{ maxWidth: '700px', border: 'none' }}>
        <div className="mb-4" style={{ fontSize: '4rem' }}>✅</div>
        <h1 className="text-success mb-2">Order Created Successfully!</h1>
        <p className="text-muted mb-4">Order ID: <span className="font-bold text-dark">#{order._id || order.id}</span></p>

        <div className="order-summary-box bg-light p-4 rounded mb-4 text-start">
          <h3 className="h5 border-bottom pb-2 mb-3">Order Summary</h3>
          <div className="flex-between mb-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Payment Method:</span>
            <span className="font-bold">{order.paymentMethod || 'COD'}</span>
          </div>
          <div className="flex-between mb-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Amount:</span>
            <span className="font-bold text-primary">{formatCurrency(order.totalAmount)}</span>
          </div>
          <div className="mt-3">
            <p className="mb-1 text-sm font-bold">Shipping to:</p>
            <p className="text-sm text-muted">
              {order.address?.fullname}<br />
              {order.address?.street}, {order.address?.city}
            </p>
          </div>
        </div>

        {/* If UPI is selected, show the payment QR here for final step */}
        {isUPI && (
          <div className="payment-final-step p-4 border-dashed border-2 rounded bg-white mb-4" style={{ borderColor: '#FF8C00' }}>
            <h2 className="h5 mb-3">Final Step: Complete Your Payment</h2>
            <div className="qr-box mb-3">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=fewshop@bank&pn=FewShop&am=${order.totalAmount}&cu=INR`)}`} 
                alt="Payment QR" 
              />
            </div>
            <p className="text-sm mb-2">Scan the QR code to pay <strong>{formatCurrency(order.totalAmount)}</strong></p>
            <div className="alert alert-info py-2 small">
              Once paid, our team will verify your transaction and update your order status.
            </div>
          </div>
        )}

        {!isUPI && (
          <div className="alert alert-success">
            Aapka order Cash on Delivery (COD) ke liye register ho gaya hai.
          </div>
        )}

        <p className="text-muted mb-5">
          Shukriya FewShop se shopping karne ke liye. Aapka order jald hi deliver hoga.
        </p>

        <div className="flex-center gap-3" style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <Link to="/orders" className="btn btn-primary px-4 py-2" style={{ background: 'linear-gradient(90deg, #FF8C00, #FF4500)', border: 'none' }}>
            View My Orders
          </Link>
          <Link to="/" className="btn btn-outline-secondary px-4 py-2" style={{ border: '1px solid #ccc' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderSuccess;