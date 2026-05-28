 import React, {
  useState,
  useContext
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  AuthContext
} from '../context/AuthContext';

import '../style/register.css';

const Register = () => {

  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [formData,
    setFormData] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });

  const [error,
    setError] =
    useState('');

  const [loading,
    setLoading] =
    useState(false);

  // Handle Input Change
  const handleChange = (
    e
  ) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value
    }));

    setError('');
  };

  // Register Submit
  const handleSubmit =
    async (e) => {

    e.preventDefault();

    setError('');

    // Validation
    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return setError(
        'Passwords match nahi ho rahe.'
      );
    }

    if (
      formData.password
        .length < 8
    ) {
      return setError(
        'Password minimum 8 characters ka hona chahiye.'
      );
    }

    if (
      !formData.agreeToTerms
    ) {
      return setError(
        'Please accept Terms & Conditions.'
      );
    }

    setLoading(true);

    try {

      const response =
        await fetch(
          'http://localhost:5000/api/auth/register',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify({
              name: `${formData.firstName} ${formData.lastName}`,
              email:
                formData.email,
              password:
                formData.password
            })
          }
        );

      const data =
        await response.json();

      if (
        !response.ok
      ) {
        throw new Error(
          data.message ||
          'Registration failed'
        );
      }

      // Auto login
      login(
        data.user ||
          data
      );

      navigate(
        '/dashboard'
      );

    } catch (err) {

      if (
        err.message ===
        'Failed to fetch'
      ) {
        setError(
          'Backend server start karo (Port 5000)'
        );
      } else {
        setError(
          err.message
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* Logo */}
        <div className="register-logo">

          <div className="logo-box">
            F
          </div>

          <span className="logo-text">
            FewShop
          </span>

        </div>

        {/* Heading */}
        <h2>
          Create Account
        </h2>

        <p className="register-subtitle">
          FewShop join karein aur
          shopping shuru karein!
        </p>

        {/* Error */}
        {error && (
          <div className="error-box">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={
            handleSubmit
          }
        >

          {/* Name Row */}
          <div className="name-row">

            <div>
              <label>
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={
                  formData.firstName
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div>
              <label>
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={
                  formData.lastName
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

          </div>

          {/* Email */}
          <div
            style={{
              marginTop:
                '18px'
            }}
          >

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* Password */}
          <div
            style={{
              marginTop:
                '18px'
            }}
          >

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Minimum 8 characters"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* Confirm Password */}
          <div
            style={{
              marginTop:
                '18px'
            }}
          >

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
              value={
                formData.confirmPassword
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* Terms */}
          <div className="terms-box">

            <input
              type="checkbox"
              name="agreeToTerms"
              checked={
                formData.agreeToTerms
              }
              onChange={
                handleChange
              }
            />

            <label>
              I agree to the{' '}
              <Link to="#">
                Terms &
                Conditions
              </Link>
            </label>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="register-btn"
            disabled={
              loading
            }
          >
            {loading
              ? 'Creating Account...'
              : 'Register Now'}
          </button>

        </form>

        {/* Footer */}
        <div className="register-footer">
          <p>
            Already have an
            account?{' '}
            <Link to="/login">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;