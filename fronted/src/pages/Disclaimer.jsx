import React from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';

const Disclaimer = () => {
  return (
    <div className="disclaimer-page container py-5">
      <div className="card shadow p-4 p-md-5 bg-white rounded">
        <h1 className="mb-4 text-primary border-bottom pb-2">Disclaimer</h1>
        
        <div className="mb-4">
          <p className="text-muted small">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="mb-4">
          <h3 className="h5 text-dark">1. General Information</h3>
          <p className="text-muted">
            FewShop par di gayi sabhi jankari sirf general purpose ke liye hai. Hum koshish karte hain ki information sahi aur up-to-date rahe, lekin hum iski accuracy ya completeness ki koi guarantee nahi dete.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">2. Product Descriptions</h3>
          <p className="text-muted">
            Hum products ko sahi dikhane ki puri koshish karte hain, lekin screen settings ki wajah se colors aur textures mein thoda fark ho sakta hai. Sabhi product specifications backend data ke hisaab se di gayi hain.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">3. Pricing and Errors</h3>
          <p className="text-muted">
            Kabhi-kabhi database mein technical error ki wajah se product ki price ya stock galat dikh sakti hai. Aisi sthiti mein FewShop ke paas order cancel karne ka adhikaar hai.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">4. External Links</h3>
          <p className="text-muted">
            Is website mein dusri websites ke links ho sakte hain. FewShop ka un websites ke content ya unki availability par koi control nahi hai.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">5. Limitation of Liability</h3>
          <p className="text-muted">
            FewShop kisi bhi tarah ke loss ya damage ke liye zimmedar nahi hoga jo is website ke use se ya is par di gayi jankari par bharosa karne se ho sakta hai.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">6. Intellectual Property</h3>
          <p className="text-muted">
            Is website par maujood logo, images, aur content FewShop ki property hain. Bina permission ke inka use karna mana hai.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">7. Changes to Disclaimer</h3>
          <p className="text-muted">
            Hum kisi bhi waqt is disclaimer ko update kar sakte hain. Badlav ke baad website ka use karna aapki purani terms se sehmati mana jayega.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="h5 text-dark">8. Consent</h3>
          <p className="text-muted">
            Hamari website use karke aap hamare disclaimer aur iski terms se sehmat (consent) hote hain.
          </p>
        </section>

        <section className="mb-4 bg-light p-3 rounded border-start border-primary border-4">
          <p className="mb-0 italic">
            <strong>Note:</strong> Agar aapko koi sawal hai, toh aap hamare <Link to="/contact">Contact Page</Link> ke zariye humse baat kar sakte hain.
          </p>
        </section>

        <div className="mt-5 text-center">
          <Link to="/" className="btn btn-primary px-5 py-2">
            Back to Home
          </Link>
        </div>
      </div>
      
      <div className="text-center mt-4 text-muted small">
        <p>© 2024 FewShop. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Disclaimer;