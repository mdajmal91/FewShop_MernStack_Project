import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { formatCurrency } from '../components/currency';
import '../style/global.css';
import '../style/adminproducts.css';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Admin security check
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Relative path utilizes the proxy in package.json to avoid connection errors
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Saman load karne mein error aayi.');
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : (data.products || []));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Kya aap sach mein is product ko delete karna chahte hain?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });

        if (response.ok) {
          setProducts(prev => prev.filter(p => p._id !== id));
          alert('Product successfully delete ho gaya! ✅');
        } else {
          alert('Delete failed. Please check server logs.');
        }
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  return (
    <div className="saffron-orange-page">
      <div className="container py-5">
        <div className="profile-form-container admin-products-card shadow-lg">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h2 className="fw-bold mb-0">🛒 Manage Inventory</h2>
            <div className="d-flex gap-2">
               <Link to="/admin" className="btn btn-sm btn-outline-dark">Dashboard</Link>
               <Link to="/admin/add-product" className="btn btn-sm btn-success fw-bold">+ Add Product</Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5"><div className="spinner mx-auto"></div></div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle custom-admin-table">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">Abhi tak koi product nahi hai.</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                    <tr key={product._id}>
                      <td className="d-flex align-items-center gap-3">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="admin-prod-thumb" 
                          onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                        />
                        <span className="fw-bold text-dark">{product.name}</span>
                      </td>
                      <td><span className="badge bg-light text-dark border">{product.category || 'General'}</span></td>
                      <td className="fw-bold text-primary">{formatCurrency(product.price)}</td>
                      <td>
                        <span className={`fw-bold ${product.stock < 5 ? 'text-danger' : 'text-success'}`}>
                          {product.stock} pcs
                        </span>
                      </td>
                      <td className="text-center">
                        <Link to={`/admin/edit-product/${product._id}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
                        <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;