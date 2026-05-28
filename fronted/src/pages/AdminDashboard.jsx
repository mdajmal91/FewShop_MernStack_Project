import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../components/currency';
import '../style/global.css';
import '../style/admindashboard.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'

  useEffect(() => {
    // सुरक्षा चेक: अगर यूजर एडमिन नहीं है तो वापस भेज दें
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }

    const fetchAdminData = async () => {
      try {
        setLoading(true);
        // प्रोडक्ट्स फेच करें
        const prodRes = await fetch('http://localhost:5000/api/products');
        const prodData = await prodRes.json();
        setProducts(Array.isArray(prodData) ? prodData : (prodData.products || []));

        // ऑर्डर्स फेच करें (इसके लिए एडमिन टोकन चाहिए होगा)
        const orderRes = await fetch('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          setOrders(orderData);
        }
      } catch (error) {
        console.error("Admin Data Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [user, navigate]);

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Kya aap sach mein is product ko delete karna chahte hain?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (res.ok) {
          setProducts(products.filter(p => p._id !== id));
          alert('Product deleted successfully!');
        }
      } catch (err) {
        alert('Delete fail ho gaya.');
      }
    }
  };

  if (loading) return <div className="gradient-page-wrapper flex-center"><div className="spinner"></div></div>;

  return (
    <div className="gradient-page-wrapper">
      <div className="profile-form-container" style={{ maxWidth: '1200px' }}>
        <div className="admin-header d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
          <div>
            <h1 className="fw-bold mb-0">🛡️ Admin Dashboard</h1>
            <p className="text-muted mb-0">Welcome back, {user.name}</p>
          </div>
          <Link to="/admin/add-product" className="btn btn-primary px-4 py-2 fw-bold shadow">
            + Add New Product
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="stat-card p-4 rounded shadow-sm border-start border-primary border-5 bg-light">
              <span className="text-muted small text-uppercase fw-bold">Total Products</span>
              <h2 className="fw-bold mb-0">{products.length}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card p-4 rounded shadow-sm border-start border-success border-5 bg-light">
              <span className="text-muted small text-uppercase fw-bold">Total Orders</span>
              <h2 className="fw-bold mb-0">{orders.length}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card p-4 rounded shadow-sm border-start border-warning border-5 bg-light">
              <span className="text-muted small text-uppercase fw-bold">Admin Status</span>
              <h2 className="fw-bold mb-0 text-success">Active</h2>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs mb-4">
          <button 
            className={`btn me-2 ${activeTab === 'products' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setActiveTab('products')}
          >Manage Products</button>
          <button 
            className={`btn ${activeTab === 'orders' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setActiveTab('orders')}
          >Recent Orders</button>
        </div>

        {/* Content Area */}
        <div className="admin-content-box bg-white">
          {activeTab === 'products' ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td><img src={product.imageUrl} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                      <td className="fw-bold">{product.name}</td>
                      <td><span className="badge bg-info text-dark">{product.category}</span></td>
                      <td>{formatCurrency(product.price)}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteProduct(product._id)}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">Order management interface loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;