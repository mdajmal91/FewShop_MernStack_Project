import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import { Link } from 'react-router-dom';

import {
  AuthContext
} from '../context/AuthContext';

import ProductCard from '../components/ProductCard';

import '../style/global.css';
import '../style/dashboard.css';

const Dashboard = () => {

  const { user } =
    useContext(AuthContext);

  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState('');

  // Fetch Products
  useEffect(() => {

    const fetchProducts =
      async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            '/api/products'
          );

        if (
          !response.ok
        ) {
          throw new Error(
            'Products load nahi hue'
          );
        }

        const data =
          await response.json();

        const productsArray =
          Array.isArray(data)
            ? data
            : data.products ||
              data.data ||
              [];

        setProducts(
          productsArray
        );

        setError('');

      } catch (err) {

        console.error(
          err
        );

        if (
          err.message ===
          'Failed to fetch'
        ) {
          setError(
            'Backend server band hai (Port 5000).'
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

    fetchProducts();

  }, []);

  // Not logged in
  if (!user) {
    return (
      <div
        className="container"
        style={{
          textAlign:
            'center',
          padding:
            '80px'
        }}
      >

        <h1>
          🔒 Access
          Denied
        </h1>

        <p>
          Dashboard dekhne
          ke liye login
          karo.
        </p>

        <Link to="/login">
          <button
            style={{
              padding:
                '12px 25px',
              cursor:
                'pointer'
            }}
          >
            Go To Login
          </button>
        </Link>

      </div>
    );
  }

  return (
    <div className="dashboard-page container py-4">

      {/* Header */}
      <header className="dashboard-header mb-5">

        <h1>
          Welcome{' '}
          <span
            style={{
              color:
                '#007bff'
            }}
          >
            {user?.name ||
              user?.email ||
              'User'}
          </span>
          🎉
        </h1>

        <p>
          Explore your
          products here.
        </p>

      </header>

      {/* Error */}
      {error && (
        <div
          style={{
            background:
              '#ffe5e5',
            color:
              'red',
            padding:
              '15px',
            borderRadius:
              '10px',
            marginBottom:
              '20px'
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div
          style={{
            textAlign:
              'center',
            padding:
              '50px'
          }}
        >
          <h3>
            Loading
            products...
          </h3>
        </div>
      ) : (
        <div>

          <h2>
            Products (
            {products.length}
            )
          </h2>

          {products.length >
          0 ? (

            <div
              className="dashboard-products-grid"
              style={{
                display:
                  'grid',
                gridTemplateColumns:
                  'repeat(auto-fit,minmax(250px,1fr))',
                gap:
                  '20px',
                marginTop:
                  '20px'
              }}
            >
              {products.map(
                (
                  product,
                  index
                ) => (
                  <ProductCard
                    key={
                      product._id ||
                      index
                    }
                    product={
                      product
                    }
                  />
                )
              )}
            </div>

          ) : (

            <div
              style={{
                textAlign:
                  'center',
                marginTop:
                  '50px'
              }}
            >
              <h3>
                No Products
                Found 😕
              </h3>

              <p>
                Abhi tak koi
                products add
                nahi hue.
              </p>
            </div>

          )}

        </div>
      )}

    </div>
  );
};

export default Dashboard;