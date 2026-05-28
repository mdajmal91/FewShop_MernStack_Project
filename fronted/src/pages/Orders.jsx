import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../components/currency';
import '../style/global.css';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Orders Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="gradient-page-wrapper">
      <div className="profile-form-container" style={{ maxWidth: '1000px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h2 className="fw-bold mb-0">📦 My Orders</h2>
          <Link to="/profile" className="btn btn-sm btn-outline-dark">Back to Profile</Link>
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner mx-auto"></div></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">आपने अभी तक कोई ऑर्डर नहीं दिया है।</p>
            <Link to="/shop" className="btn btn-primary mt-2">अभी शॉपिंग करें</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="card mb-4 border shadow-sm overflow-hidden">
                <div className="card-header bg-light d-flex justify-content-between align-items-center p-3">
                  <div>
                    <span className="text-muted small">ORDER ID: </span>
                    <span className="fw-bold">#{order._id.substring(0, 10).toUpperCase()}</span>
                  </div>
                  <span className={`badge ${order.isPaid ? 'bg-success' : 'bg-warning'} px-3 py-2`}>
                    {order.status || 'Processing'}
                  </span>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <thead className="bg-light small text-uppercase">
                        <tr>
                          <th className="ps-4">Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th className="pe-4 text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, index) => (
                          <tr key={index} className="border-bottom">
                            <td className="ps-4 py-3 fw-bold">{item.name || 'Product Details'}</td>
                            <td className="py-3">{formatCurrency(item.price)}</td>
                            <td className="py-3 text-center">{item.qty}</td>
                            <td className="pe-4 py-3 text-end fw-bold text-primary">
                              {formatCurrency(item.price * item.qty)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer bg-white p-3 text-end">
                  <span className="me-2 text-muted">Grand Total:</span>
                  <span className="h5 fw-bold text-dark mb-0">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;