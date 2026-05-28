import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../style/global.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const otp = searchParams.get('otp');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords match nahi ho rahe.');
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password: formData.password }),
      });

      if (response.ok) {
        alert('Password successfully reset ho gaya! Ab naye password se login karein.');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Reset fail ho gaya.');
      }
    } catch (err) {
      setError('Server error occur hui.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-page-wrapper flex-center">
      <div className="profile-form-container" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold">Set New Password 🛡️</h2>
        <p className="text-center text-muted mb-4 small">
          Email: <strong>{email}</strong> ke liye naya password set karein.
        </p>

        {error && <div className="alert alert-danger py-2 text-center small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">New Password</label>
            <input 
              type="password" 
              className="form-control py-2" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">Confirm New Password</label>
            <input 
              type="password" 
              className="form-control py-2" 
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 fw-bold shadow" disabled={loading}>
            {loading ? 'Updating...' : 'Reset & Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;