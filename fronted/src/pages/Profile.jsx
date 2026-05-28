import React, {
  useContext,
  useState,
  useEffect
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  AuthContext
} from '../context/AuthContext';

import {
  formatCurrency
} from '../components/currency';

import '../style/profile.css';

const Profile = () => {

  const { user, logout } = useContext(AuthContext) || { user: null, logout: () => {} };

  const navigate =
    useNavigate();

  const [orders,
    setOrders] =
    useState([]);

  const [ordersLoading,
    setOrdersLoading] =
    useState(true);

  const [ordersError,
    setOrdersError] =
    useState(null);

  // Logout
  const handleLogout =
    () => {

      logout();
      navigate('/login');
    };

  // Fetch Orders
  useEffect(() => {

    if (
      user &&
      user.token
    ) {

      const fetchOrders =
        async () => {

          try {

            setOrdersLoading(
              true
            );

            const response =
              await fetch(
                'http://localhost:5000/api/orders/myorders',
                {
                  headers: {
                    Authorization:
                      `Bearer ${user.token}`
                  }
                }
              );

            if (
              !response.ok
            ) {
              throw new Error(
                'Orders fetch failed'
              );
            }

            const data =
              await response.json();

            setOrders(
              Array.isArray(data) ? data : (data.orders || [])
            );

            setOrdersError(
              null
            );

          } catch (
            error
          ) {

            console.error(
              'Orders Fetch Error:',
              error
            );

            setOrdersError(
              'Orders load nahi ho paye.'
            );

          } finally {

            setOrdersLoading(
              false
            );
          }
        };

      fetchOrders();
    }

  }, [user]);

  // Not Logged In
  if (!user) {

    return (
      <div className="profile-page">

        <div className="profile-card text-center">

          <div className="lock-icon">
            🔒
          </div>

          <h2>
            Access Denied
          </h2>

          <p>
            Profile dekhne ke liye login karein.
          </p>

          <Link
            to="/login"
            className="profile-btn"
          >
            Login Karein
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">

          <div className="profile-avatar">
            {
              user.name
                ?.charAt(0)
                .toUpperCase()
            }
          </div>

          <h1>
            Hi,
            {' '}
            {
              user.name
            }
            {' '}
            👋
          </h1>

          <p>
            {
              user.email
            }
          </p>

        </div>

        {/* Personal Info */}
        <div className="profile-section">

          <h3>
            Personal Information
          </h3>

          <div className="info-row">

            <span>
              Full Name
            </span>

            <strong>
              {
                user.name
              }
            </strong>

          </div>

          <div className="info-row">

            <span>
              Email
            </span>

            <strong>
              {
                user.email
              }
            </strong>

          </div>

          <div className="info-row">

            <span>
              Account Type
            </span>

            <strong>
              {
                user.isAdmin
                  ? 'Admin'
                  : 'Customer'
              }
            </strong>

          </div>

        </div>

        {/* Orders */}
        <div className="profile-section">

          <h3>
            Recent Orders
          </h3>

          {
            ordersLoading
              ? (
                <div className="loading-text">
                  Loading Orders...
                </div>
              )
              : ordersError
                ? (
                  <div className="error-box">
                    {
                      ordersError
                    }
                  </div>
                )
                : orders.length === 0
                  ? (
                    <div className="empty-orders">

                      <p>
                        Abhi tak koi order nahi hai.
                      </p>

                      <Link
                        to="/shop"
                        className="profile-btn"
                      >
                        Shop Now
                      </Link>

                    </div>
                  )
                  : (
                    <div className="orders-list">

                      {
                        orders
                          .slice(
                            0,
                            5
                          )
                          .map(
                            (
                              order
                            ) => (

                              <div
                                className="order-card"
                                key={
                                  order._id
                                }
                              >

                                <div>

                                  <h4>
                                    #
                                    {
                                      order._id.substring(
                                        0,
                                        8
                                      )
                                    }
                                  </h4>

                                  <small>
                                    {
                                      new Date(
                                        order.createdAt
                                      ).toLocaleDateString()
                                    }
                                  </small>

                                </div>

                                <div>

                                  <strong>
                                    {
                                      formatCurrency(
                                        order.totalPrice
                                      )
                                    }
                                  </strong>

                                </div>

                                <div>

                                  <span className={`status-badge ${order.status?.toLowerCase()}`}>
                                    {
                                      order.status ||
                                      'Pending'
                                    }
                                  </span>

                                </div>

                              </div>
                            )
                          )
                      }

                    </div>
                  )
          }

        </div>

        {/* Buttons */}
        <div className="profile-actions">

          <Link
            to="/settings"
            className="profile-outline-btn"
          >
            ⚙️ Settings
          </Link>

          <Link
            to="/orders"
            className="profile-outline-btn"
          >
            📦 My Orders
          </Link>

          <Link
            to="/cart"
            className="profile-outline-btn"
          >
            🛒 Cart
          </Link>

          <button
            onClick={
              handleLogout
            }
            className="logout-btn"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;