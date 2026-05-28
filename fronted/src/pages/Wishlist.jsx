import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../style/global.css';

const Wishlist = () => {
  // मान लीजिए आपकी Redux state में wishlist मौजूद है
  // अगर नहीं है, तो आप इसे Profile की तरह API से भी फेच कर सकते हैं
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  return (
    <div className="gradient-page-wrapper">
      <div className="profile-form-container" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
          <h2 className="fw-bold mb-0 text-dark">❤️ My Wishlist</h2>
          <Link to="/shop" className="btn btn-outline-primary">Browse More</Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem' }} className="mb-3">💝</div>
            <h3 className="fw-bold">Your Wishlist is Empty</h3>
            <p className="text-muted mb-4">अपने पसंदीदा प्रोडक्ट्स को सेव करें ताकि आप उन्हें बाद में देख सकें।</p>
            <Link to="/shop" className="btn btn-primary px-5 py-2 fw-bold shadow">
              Start Adding Items
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlistItems.map((product) => (
              <div key={product._id} className="col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-5 pt-4 text-center border-top">
           <p className="text-muted small">
             Wishlist products are saved to your account for easy access across devices.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;