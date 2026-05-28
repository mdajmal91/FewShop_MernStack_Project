import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import '../style/global.css';

const VerifyOTP = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  // Countdown Timer Logic
  useEffect(() => {
    if (timer === 0) return;

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text').slice(0, 6).split('');
    if (data.length === 6 && data.every(char => !isNaN(char))) {
      setOtp(data);
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  // Resend OTP Handler
  const handleResend = async () => {
    if (timer > 0) return;

    setLoading(true);
    setError('');
    try {
      // Triggering new OTP via forgot-password endpoint
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimer(60); // Reset timer to 60s
        setOtp(['', '', '', '', '', '']); // Clear inputs
        inputRefs.current[0].focus();
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'OTP resend karne mein problem hui.');
      }
    } catch (err) {
      setError('Server connection error. Kripya check karein.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return setError('Kripya pura 6-digit OTP dalein.');

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      if (response.ok) {
        navigate(`/reset-password?email=${email}&otp=${otpValue}`);
      } else {
        const data = await response.json();
        setError(data.message || 'OTP galat hai.');
      }
    } catch (err) {
      setError('Connectivity issue occur hui.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-page-wrapper flex-center">
      <div className="profile-form-container text-center" style={{ maxWidth: '450px' }}>
        <h2 className="fw-bold mb-3">Verification 🔐</h2>
        <p className="text-muted mb-4 small">
          Humne <strong>{email}</strong> par ek code bheja hai.
        </p>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-4" onPaste={handlePaste}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="form-control text-center fw-bold fs-4"
                style={{ width: '45px', height: '55px', borderRadius: '10px', border: '2px solid #ddd' }}
                required
              />
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 fw-bold shadow" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-4 border-top pt-3 text-muted small">
          Code nahi mila?{' '}
          {timer > 0 ? (
            <span className="text-muted">
              Resend code in <span className="fw-bold">{timer}s</span>
            </span>
          ) : (
            <span
              className="text-primary"
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
              onClick={handleResend}
            >
              Resend Code
            </span>
          )}
          <div className="mt-2">
            <Link to="/forgot-password" style={{ color: 'inherit' }}>Change Email</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;