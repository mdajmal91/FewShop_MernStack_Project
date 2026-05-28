import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../style/global.css';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    imageUrl: '',
    stock: 10,
    platform: 'FewShop', // Default platform
    externalUrl: '',
    isFeatured: false
  });

  // सुरक्षा चेक: अगर एडमिन नहीं है तो एक्सेस न दें
  if (!user || !user.isAdmin) {
    return (
      <div className="gradient-page-wrapper flex-center">
        <div className="profile-form-container text-center">
          <h2 className="text-danger">Access Denied</h2>
          <p>This page is only for administrators.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Product successfully add ho gaya! 🎉');
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        setError(data.message || 'Product add karne mein error aayi.');
      }
    } catch (err) {
      setError('Server connection error. Kripya check karein.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="saffron-orange-page">
      <div className="container py-5">
        <div className="profile-form-container shadow-lg" style={{ maxWidth: '800px' }}>
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h2 className="fw-bold mb-0">✨ Add New Product</h2>
            <Link to="/admin" className="btn btn-sm btn-outline-dark">Cancel</Link>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-12">
              <label className="form-label fw-bold small">Product Name *</label>
              <input type="text" name="name" className="form-control" placeholder="e.g. RGB Gaming Mouse" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-bold small">Description *</label>
              <textarea name="description" className="form-control" rows="3" placeholder="Describe the product..." value={formData.description} onChange={handleChange} required></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">Price (₹) *</label>
              <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">Original Price (₹)</label>
              <input type="number" name="originalPrice" className="form-control" value={formData.originalPrice} onChange={handleChange} placeholder="Optional for discount" />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">Category *</label>
              <input type="text" name="category" className="form-control" placeholder="e.g. Gadgets, Audio" value={formData.category} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">Stock Quantity *</label>
              <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-bold small">Product Image URL *</label>
              <input type="text" name="imageUrl" className="form-control" placeholder="https://example.com/image.jpg" value={formData.imageUrl} onChange={handleChange} required />
            </div>

            <div className="col-md-12 mt-4">
              <button type="submit" className="btn btn-primary w-full py-3 fw-bold shadow-sm" disabled={loading} style={{ background: 'linear-gradient(90deg, #FF8C00, #FF4500)', border: 'none' }}>
                {loading ? 'Processing...' : '🚀 Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;