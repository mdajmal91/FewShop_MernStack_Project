import React from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';

const ReturnPolicy = () => {
  return (
    <div className="return-policy-page container py-5">
      <div className="card shadow p-4 p-md-5 bg-white rounded border-0">
        <h1 className="mb-4 text-primary border-bottom pb-2">Return & Refund Policy</h1>
        
        <div className="mb-4">
          <p className="text-muted small">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="mb-4">
          <h3 className="h5 text-dark">1. Return Window</h3>
          <p className="text-muted">
            FewShop par hum <strong>30-days return policy</strong> provide karte hain. Agar aap apne product se khush nahi hain, toh delivery ke 30 dinon ke andar aap return request generate kar sakte hain.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">2. Eligibility for Returns</h3>
          <p className="text-muted">Return ke liye niche di gayi conditions honi chahiye:</p>
          <ul className="text-muted ps-3">
            <li>Product original packaging mein hona chahiye.</li>
            <li>Product unused aur usi condition mein hona chahiye jisme aapko mila tha.</li>
            <li>Purchase ki receipt ya proof hona zaroori hai.</li>
            <li>Tags aur labels intact hone chahiye.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">3. Non-Returnable Items</h3>
          <p className="text-muted">
            Kuch items return nahi kiye ja sakte, jaise ki: personal care products, innerwear, aur "Final Sale" wale items.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">4. Refund Process</h3>
          <p className="text-muted">
            Jab humein aapka returned item mil jayega aur uska inspection ho jayega, hum aapko email ke zariye notify karenge. Approval ke baad, aapka refund aapke original payment method par <strong>7-10 working days</strong> mein credit ho jayega.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">5. Shipping Costs</h3>
          <p className="text-muted">
            Agar product defective hai toh shipping hum pay karenge. Lekin agar aap preference ki wajah se return kar rahe hain, toh return shipping cost customer ko deni hogi.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">6. Exchanges</h3>
          <p className="text-muted">
            Hum sirf defective ya damaged items ko replace karte hain. Agar aapko exchange chahiye, toh humein <a href="mailto:support@fewshop.com">support@fewshop.com</a> par contact karein.
          </p>
        </section>

        <div className="mt-5 text-center flex-center gap-3">
          <Link to="/shop" className="btn btn-primary px-5 py-2">
            Continue Shopping
          </Link>
          <Link to="/" className="btn btn-outline-secondary px-4 py-2" style={{ border: '1px solid #ddd' }}>
            Back to Home
          </Link>
        </div>
      </div>
      
      <div className="text-center mt-4 text-muted small">
        <p>© 2024 FewShop. Your satisfaction is our priority.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;