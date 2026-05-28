import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import'../style/setting.css';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      return setStatus({ type: 'error', msg: 'New passwords match nahi ho rahe.' });
    }

    setStatus({ type: 'info', msg: 'Updating profile...' });
    
    try {
      const response = await fetch(`http://localhost:5000/api/users/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Profile updated successfully! ✅' });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', msg: data.message || 'Update failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Server connectivity error.' });
    }
  };

  return (
    <div className="gradient-page-wrapper">
      <div className="profile-form-container" style={{ maxWidth: '700px' }}>
        <div className="mb-4 border-bottom pb-3">
          <h2 className="fw-bold mb-1">⚙️ Account Settings</h2>
          <p className="text-muted small">Manage your profile information and security</p>
        </div>

        {status.msg && (
          <div className={`alert alert-${status.type === 'success' ? 'success' : 'info'} py-2`}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <h4 className="h6 fw-bold text-uppercase text-muted mb-3">Public Profile</h4>
            <div className="mb-3">
              <label className="form-label small fw-bold">Full Name</label>
              <input type="text" name="name" className="form-control py-2" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Email Address</label>
              <input type="email" name="email" className="form-control py-2 bg-light" value={formData.email} readOnly />
              <small className="text-muted">ईमेल को सुरक्षा कारणों से बदला नहीं जा सकता।</small>
            </div>
          </div>

          <div className="mb-4 pt-3 border-top">
            <h4 className="h6 fw-bold text-uppercase text-muted mb-3">Security</h4>
            <div className="mb-3">
              <label className="form-label small fw-bold">Current Password</label>
              <input type="password" name="currentPassword" placeholder="••••••••" className="form-control py-2" value={formData.currentPassword} onChange={handleChange} />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-bold">New Password</label>
                <input type="password" name="newPassword" placeholder="New Secret" className="form-control py-2" value={formData.newPassword} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-bold">Confirm New Password</label>
                <input type="password" name="confirmPassword" placeholder="Repeat Secret" className="form-control py-2" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-primary py-3 fw-bold shadow">
              Save Changes
            </button>
            <Link to="/profile" className="btn btn-outline-dark py-2">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;