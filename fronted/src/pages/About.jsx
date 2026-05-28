import React from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';
import '../style/about.css';

const About = () => {
  return (
    <div className='about-page'>
      {/* Hero Section */}
      <section className='hero-section about-hero'>
        <div className='hero-content text-center hero-container'>
          <h1 className='hero-title'>About FewShop</h1>
          <p className='hero-subtitle'>
            Humara maqsad hai shopping ko har kisi ke liye aasaan, sasta aur bharosemand banana.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='container py-5'>
        <div className='mission-flex'>
          <div className='mission-text'>
            <h2 className='mb-3'>Hamari Kahani (Our Story)</h2>
            <p className='mb-3'>
              FewShop ki shuruat 2024 mein hui thi ek simple idea ke saath: Kya ho agar aapko behtareen quality ke products ek hi jagah mil sakein bina kisi extra cost ke?
            </p>
            <p>
              Aaj hum hazaron customers ko electronics, fashion aur gadgets deliver kar rahe hain. Hum sirf products nahi bechte, hum ek behtar shopping experience deliver karne mein yakeen rakhte hain.
            </p>
          </div>
          <div className='mission-image'>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
              alt="Team working" 
              className='rounded shadow'
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Reusing Benefits Grid */}
      <section className='benefits-section bg-light py-5'>
        <div className='container'>
          <h2 className='section-title text-center mb-5'>Hamare Core Values</h2>
          <div className='benefits-grid about-benefits'>
            <div className='benefit-card text-center p-4 bg-white rounded shadow-sm'>
              <div className='benefit-icon mb-3'>🎯</div>
              <h3>Quality Focus</h3>
              <p>Hum har product ko verify karte hain taaki aapko mile sirf asli aur tikau samaan.</p>
            </div>
            <div className='benefit-card text-center p-4 bg-white rounded shadow-sm'>
              <div className='benefit-icon mb-3'>🤝</div>
              <h3>Customer Trust</h3>
              <p>Aapka data aur payments humare saath 100% secure hain. Hum transparency mein yakeen rakhte hain.</p>
            </div>
            <div className='benefit-card text-center p-4 bg-white rounded shadow-sm'>
              <div className='benefit-icon mb-3'>🚀</div>
              <h3>Innovation</h3>
              <p>Hum rozana apne platform ko update karte hain taaki aapko miley ek modern interface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links Section */}
      <section className='social-links-section py-5'>
        <div className='container text-center'>
          <h2 className='mb-4'>Humein Follow Karein</h2>
          <div className='social-buttons-container'>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
              <i className="fab fa-youtube"></i> YouTube
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn twitter">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='cta-section text-center py-5'>
        <div className='container'>
          <h2 className='mb-4'>Humse Judein</h2>
          <p className='mb-4 text-muted'>Agar aapka koi sawal hai ya aap humare saath kaam karna chahte hain, toh humse sampark karein.</p>
          <div className='flex-center cta-btns'>
            <Link to="/contact" className='btn btn-primary px-5 py-2 main-cta'>
              Contact Us
            </Link>
            <Link to="/shop" className='btn outline-cta'>
              View Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;