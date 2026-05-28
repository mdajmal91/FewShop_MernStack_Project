import React from 'react';
import { Link } from 'react-router-dom';
import '../style/footer.css';

const Footer = () => {
  return (
    <footer className="footer">

      {/* Top Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <div>
            <h2>Stay Updated 🛍️</h2>
            <p>
              Latest offers, discounts aur premium products ki updates paane ke liye subscribe karein.
            </p>
          </div>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <h2>FewShop</h2>
            <span>Premium Shopping Experience</span>
          </div>

          <p className="footer-description">
            FewShop ek trusted eCommerce platform hai jahan aapko
            premium quality products, secure payment aur fast delivery
            ka best experience milta hai.
          </p>

          <div className="social-media">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">
            Quick Links
          </h3>

          <ul className="footer-links">
            <li>
              <Link to="/">🏠 Home</Link>
            </li>

            <li>
              <Link to="/shop">🛒 Shop</Link>
            </li>

            <li>
              <Link to="/about">ℹ️ About Us</Link>
            </li>

            <li>
              <Link to="/contact">📞 Contact</Link>
            </li>

            <li>
              <Link to="/profile">👤 Profile</Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3 className="footer-title">
            Customer Support
          </h3>

          <ul className="footer-links">
            <li>
              <Link to="/returns">
                Returns & Refunds
              </Link>
            </li>

            <li>
              <Link to="/shipping">
                Shipping Policy
              </Link>
            </li>

            <li>
              <Link to="/privacy">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms">
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link to="/faq">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-title">
            Contact Info
          </h3>

          <div className="contact-info">
            <p>
              📧 support@fewshop.com
            </p>

            <p>
              📞 +91 99999 88888
            </p>

            <p>
              📍 New Delhi, India
            </p>

            <p>
              🕒 Mon - Sat : 10 AM - 8 PM
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © 2025 FewShop. All Rights Reserved.
        </p>

        <div className="footer-bottom-links">
          <Link to="/privacy">
            Privacy
          </Link>

          <Link to="/terms">
            Terms
          </Link>

          <Link to="/contact">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;