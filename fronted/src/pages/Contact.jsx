import React, { useState } from 'react';
import '../style/contact.css';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      '✅ Message sent successfully!'
    );

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">

        <div className="contact-hero-content">

          <span className="contact-badge">
            📞 Contact FewShop
          </span>

          <h1>
            We’d Love To Hear
            From You
          </h1>

          <p>
            Agar aapko koi problem,
            suggestion ya help chahiye,
            humse contact karein.
          </p>

        </div>

      </section>

      <div className="contact-container">

        {/* CONTACT INFO */}
        <div className="contact-info-grid">

          <div className="contact-card">
            <div className="icon">
              📍
            </div>

            <h3>
              Our Address
            </h3>

            <p>
              FewShop Head Office,
              Techno Park, IT Hub,
              New Delhi, India
            </p>
          </div>

          <div className="contact-card">
            <div className="icon">
              ✉️
            </div>

            <h3>
              Support
            </h3>

            <p>
              support@fewshop.com
            </p>

            <p>
              +91 99999 88888
            </p>
          </div>

          <div className="contact-card">
            <div className="icon">
              ⏰
            </div>

            <h3>
              Working Hours
            </h3>

            <p>
              Monday - Saturday
            </p>

            <p>
              10:00 AM - 6:00 PM
            </p>
          </div>

        </div>

        {/* FORM */}
        <div className="contact-form-wrapper">

          <div className="contact-form-card">

            <h2>
              Send Message
            </h2>

            <p>
              Fill the form below and
              our team will contact you.
            </p>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="form-group">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Message
                </label>

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Write your message..."
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="send-btn"
              >
                🚀 Send Message
              </button>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;