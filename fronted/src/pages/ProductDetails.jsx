import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import { formatCurrency } from '../components/currency';
import '../style/global.css';
import '../style/productdetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]); // New state for similar products

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const isInCart = cartItems.some(item => item._id === id);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product nahi mila ya server error hai.');
        }
        const data = await response.json();
        // Robustly handle different API response formats for the main product
        const fetchedProduct = data.product || data.data || data; 
        setProduct(fetchedProduct);

        // Fetch Similar Products from the new dedicated endpoint
        const similarRes = await fetch(`http://localhost:5000/api/products/${id}/similar`);
        if (similarRes.ok) {
          const similarData = await similarRes.json();
          // Ensure similarData is an array
          setSimilarProducts(Array.isArray(similarData) ? similarData : []);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'inc' && quantity < (product.stock || 10)) {
      setQuantity(prev => prev + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Pehle login karein!");
      return navigate('/login');
    }

    dispatch({
      type: 'cart/addToCart', // Ensure your cartSlice name matches this
      payload: { ...product, quantity: quantity }
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (loading) return (
    <div className="container flex-center py-5" style={{ minHeight: '60vh' }}>
      <div className="spinner"></div>
      <p className="mt-3 text-muted">Product details load ho rahi hain...</p>
    </div>
  );

  if (error || !product) return (
    <div className="container text-center py-5">
      <h2 className="text-danger">Oops! {error || "Product nahi mila."}</h2>
      <Link to="/" className="btn btn-primary mt-3">Back to Shop</Link>
    </div>
  );

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="product-details-page container py-5" style={{ minHeight: '80vh' }}>
      <div className="breadcrumb mb-4">
        <Link to="/">Home</Link> / <Link to="/shop">Products</Link> / <span className="text-muted">{product.name}</span>
      </div>

      <div className="details-grid mb-5" style={{ position: 'relative' }}>
        <div className="image-gallery shadow rounded bg-white">
          {isImageLoading && <div className="image-skeleton-large"></div>}
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={`main-product-img ${isImageLoading ? 'hidden' : 'visible'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/500?text=No+Image'; setIsImageLoading(false); }}
          />
          {discount > 0 && <span className="detail-discount-badge">-{discount}% OFF</span>}
        </div>

        {/* Info Section */}
        <div className="product-info-panel p-4">
          <h1 className="display-6 fw-bold mb-2">{product.name}</h1>
          <div className="rating-row mb-3">
            <span className="stars-gold">{"★".repeat(Math.floor(product.rating || 4))}</span>
            <span className="text-muted ms-2">({product.reviewCount || 0} Customer Reviews)</span>
          </div>

          <div className="price-box mb-4">
            <span className="current-price h2 text-primary">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price text-decoration-line-through ms-3 text-muted">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="product-long-desc mb-4 text-muted">
            {product.description || "Behtareen quality ka product. Iski durability aur performance aapko zaroor pasand aayegi."}
          </p>

          <div className="stock-status-large mb-4">
            {product.stock > 0 ? (
              <span className="badge bg-success">In Stock ({product.stock} units left)</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <div className="purchase-controls">
              <div className="quantity-selector me-3">
                <button onClick={() => handleQuantityChange('dec')}>-</button>
                <input type="number" value={quantity} readOnly style={{ width: '60px', textAlign: 'center' }} />
                <button onClick={() => handleQuantityChange('inc')}>+</button>
              </div>
              
              <button 
                className={`btn btn-lg ${isInCart ? 'btn-success' : 'btn-primary'} add-cart-btn`}
                onClick={handleAddToCart}
              > 
                {isInCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>
          )}

          {showNotification && (
            <div className="added-alert mt-3 p-2 bg-success text-white rounded text-center">
              Product successfully cart mein add ho gaya!
            </div>
          )}

          <div className="meta-info mt-5 pt-4 border-top">
            <p><strong>Category:</strong> {product.category || 'General'}</p>
            <p><strong>SKU:</strong> FEW-{id.substring(0,6).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <section className="similar-products-section py-5">
          <h2 className="text-center mb-4 h3">Similar Products You Might Like</h2>
          <div className="similar-products-grid">
            {similarProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;