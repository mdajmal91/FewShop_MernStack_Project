import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../context/AuthContext'
import { formatCurrency } from './currency'
import "../style/productcard.css"

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  
  // Safety check for Redux state to prevent "cannot read property cartItems of undefined"
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  // Check if product is in cart
  const isInCart = cartItems?.some(item => item._id === product._id);

  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    
    // Dispatching the product to the Redux store
    // Make sure your cartSlice defines an 'addToCart' action
    dispatch({
      type: 'cart/addToCart', // Or use your imported action creator
      payload: product
    });
    
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  // Calculate discount if original price is available
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Determine stock status
  const isOutOfStock = product.stock === 0 || product.stock < 1;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  // Generate rating stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 0;

  return (
    <div className='product-card'>
      {/* Image Container */}
      <div className='product-image-container'>
        {/* Badges */}
        <div className='product-badges'>
          {discountPercent > 0 && (
            <span className='badge discount-badge'>
              -{discountPercent}%
            </span>
          )}
          {product.isFeatured && (
            <span className='badge featured-badge'>
              Featured
            </span>
          )}
          {isLowStock && (
            <span className='badge low-stock-badge'>
              Low Stock
            </span>
          )}
          {isOutOfStock && (
            <span className='badge out-of-stock-badge'>
              Out of Stock
            </span>
          )}
          {product.platform && (
            <a 
              href={product.externalUrl || (product.platform === 'Amazon' ? 'https://www.amazon.in' : product.platform === 'Meesho' ? 'https://www.meesho.com' : 'https://www.flipkart.com')} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`badge platform-badge ${product.platform.toLowerCase()}`} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: 'rgba(255, 255, 255, 0.9)', 
                padding: '4px 10px', 
                border: '1px solid #ddd',
                borderRadius: '20px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={product.platform === 'Amazon' 
                  ? 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg' 
                  : product.platform === 'Meesho'
                  ? 'https://static.meeshosupply.com/supplier-blog/meesho-logo.png'
                  : 'https://seeklogo.com/images/F/flipkart-logo-3F33927DAA-seeklogo.com.png'
                } 
                alt={product.platform} 
                style={{ height: '16px', objectFit: 'contain', marginRight: '6px' }}
              />
              <span style={{ color: '#333', fontSize: '0.75rem', fontWeight: 'bold' }}>Explore {product.platform}</span>
            </a>
          )}
        </div>

        {/* Image */}
        <Link to={`/products/${product._id}`} className='image-link'>
          {isImageLoading && <div className='image-skeleton'></div>}
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={`product-image ${isImageLoading ? 'loading' : 'loaded'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/280x280?text=Product+Image';
              setIsImageLoading(false);
            }}
          />
        </Link>

        {/* Quick Action Buttons */}
        <div className='quick-actions'>
          <button
            className={`quick-action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Toggle wishlist"
          >
            <span className='icon'>♡</span>
          </button>
          <button
            className={`quick-action-btn add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            title={isOutOfStock ? 'Out of stock' : 'Add to cart'}
            aria-label="Add to cart"
          >
            <span className='icon'>🛒</span>
          </button>
        </div>

        {/* Added Notification */}
        {showAddedNotification && (
          <div className='added-notification'>
            ✓ Added to cart!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='product-info'>
        {/* Category */}
        {product.category && (
          <p className='product-category'>{product.category}</p>
        )}

        {/* Product Name */}
        <Link to={`/products/${product._id}`} className='product-name-link'>
          <h3 className='product-name'>{product.name}</h3>
        </Link>

        {/* Rating and Reviews */}
        <div className='product-rating'>
          <div className='stars'>
            {renderStars(rating)}
          </div>
          <span className='rating-text'>
            {rating.toFixed(1)}
            <span className='review-count'>({reviewCount} reviews)</span>
          </span>
        </div>

        {/* Description */}
        <p className='product-description'>
          {product.description}
        </p>

        {/* Price Section */}
        <div className='product-price-section'>
          <div className='price-container'>
            <p className='product-price'>{formatCurrency(product.price)}</p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className='product-original-price'>
                {formatCurrency(product.originalPrice)}
              </p>
            )}
          </div>
          {product.discountLabel && (
            <span className='discount-label'>{product.discountLabel}</span>
          )}
        </div>

        {/* Stock Status */}
        <div className='stock-status'>
          {isOutOfStock ? (
            <p className='stock-out'>Out of Stock</p>
          ) : isLowStock ? (
            <p className='stock-low'>Only {product.stock} left</p>
          ) : (
            <p className='stock-in'>In Stock</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className='product-actions'>
          {product.platform ? (
            <a 
              href={product.externalUrl || (product.platform === 'Amazon' ? 'https://www.amazon.in' : product.platform === 'Meesho' ? 'https://www.meesho.com' : 'https://www.flipkart.com')} 
              target="_blank" 
              rel="noopener noreferrer"
              className='view-details-button'
              style={{ 
                backgroundColor: product.platform === 'Amazon' ? '#FF9900' : product.platform === 'Meesho' ? '#f43397' : '#2874F0',
                color: 'white',
                textAlign: 'center'
              }}
            >
              Buy on {product.platform}
            </a>
          ) : (
            <Link 
              to={`/products/${product._id}`} 
              className='view-details-button'
            >
              View Details
            </Link>
          )}
          <button
            className='add-to-cart-full-button'
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Out of Stock' : isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>

        {/* Free Shipping Badge */}
        {product.freeShipping && (
          <div className='free-shipping-badge'>
            🚚 Free Shipping
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <div className='card-overlay'></div>
    </div>
  )
}

export default ProductCard; 