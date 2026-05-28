import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/global.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP aapke email par bhej diya gaya hai! 📧');
        setTimeout(() => navigate(`/verify-otp?email=${encodeURIComponent(email)}`), 1500);
      } else {
        setError(data.message || 'Email nahi mila.');
      }
    } catch (err) {
      setError('Server error. Kripya baad mein try karein.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-page-wrapper flex-center">
      <div className="profile-form-container" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold">Forgot Password? 🔑</h2>
        <p className="text-center text-muted mb-4">Apna registered email dalein taaki hum password reset kar sakein.</p>

        {error && <div className="alert alert-danger py-2 text-center small">{error}</div>}
        {message && <div className="alert alert-success py-2 text-center small">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label small fw-bold">Email Address</label>
            <input 
              type="email" 
              className="form-control py-2" 
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 fw-bold shadow" disabled={loading}>
            {loading ? 'Processing...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-4 text-center border-top pt-3">
          <Link to="/login" className="text-decoration-none text-dark small">⬅️ Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;