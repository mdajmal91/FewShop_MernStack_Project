import React, {
  useState,
  useEffect
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import ProductCard from "../components/ProductCard";
import "../style/home.css";

const Home = () => {
  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = 
    useState(null);

  const heroProduct = {
    _id: "hero-special-1",
    name:
      "FewShop Premium Headphones",
    price: 4999,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description:
      "Premium quality sound with neon lighting design."
  };

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          setLoading(true);
          setError(null);
          const response =
            await fetch(
              "http://localhost:5000/api/products"
            );

          if (!response.ok) {
            throw new Error("Products fetch karne mein error aayi.");
          }

          const data = await response.json();
          const productsArray = Array.isArray(data)
            ? data
            : data.products || [];

          setProducts(productsArray.slice(0, 6));
        } catch (error) {
          setError(
            error.message === "Failed to fetch" 
              ? "Backend server band hai. Kripya port 5000 check karein." 
              : error.message
          );
          console.error(
            "Products load error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, []);

  const handleShopNow =
    () => {
      const element =
        document.getElementById(
          "featured-products"
        );

      if (element) {
        element.scrollIntoView({
          behavior:
            "smooth"
        });
      }
    };

  const handleExploreAll =
    () => {
      navigate("/shop");
    };

  return (
    <div className="home-page">

      <header className="hero-section">
        <div className="hero-content">

          <h1 className="hero-title">
            Welcome to FewShop
          </h1>

          <p className="hero-subtitle">
            खोजें बेहतरीन
            प्रोडक्ट्स और
            डार्क लाइटिंग
            डिज़ाइन के साथ
            नया शॉपिंग
            अनुभव।
          </p>

          <div className="hero-buttons">

            <button
              onClick={
                handleShopNow
              }
              className="cta-button primary-btn"
            >
              Shop Now 🛒
            </button>

            <a
              href="https://www.meesho.com/search?q=FewShop"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button meesho-btn"
            >
              Buy on Meesho
            </a>

            <Link
              to="/about"
              className="cta-button secondary-btn"
            >
              Learn More
            </Link>

          </div>
        </div>

        <div className="hero-image">
          <img
            src={
              heroProduct.imageUrl
            }
            alt="Hero Product"
            className="hero-img"
          />
        </div>
      </header>

      <section
        id="featured-products"
        className="featured-products-section container"
      >
        <h2 className="section-title text-center">
          Featured Products
        </h2>

        {loading ? (
          <div className="loading-box">
            <h3>
              Loading...
            </h3>
          </div>
        ) : error ? (
          <div className="error-box text-center py-4">
            <h3 className="text-danger">⚠️ {error}</h3>
          </div>
        ) : (
          <div className="products-grid">
            {products.length >
            0 ? (
              products.map(
                (
                  product
                ) => (
                  <ProductCard
                    key={
                      product._id
                    }
                    product={
                      product
                    }
                  />
                )
              )
            ) : (
              <h3>
                No Products
                Found
              </h3>
            )}
          </div>
        )}

        <div className="explore-btn-box">
          <button
            onClick={
              handleExploreAll
            }
            className="view-all-button"
          >
            Explore All
            Products
          </button>
        </div>
      </section>

      <section className="benefits-section container">

        <h2 className="section-title">
          हमारा मिशन
        </h2>

        <div className="benefits-grid">

          <div className="benefit-card">
            <span className="benefit-icon">
              🚚
            </span>

            <h3>
              Fast Delivery
            </h3>

            <p>
              पूरे भारत में
              तेज़ और सुरक्षित
              डिलीवरी।
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">
              🛡️
            </span>

            <h3>
              Secure Payment
            </h3>

            <p>
              आपके सभी
              ट्रांजेक्शन
              सुरक्षित हैं।
            </p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">
              ✨
            </span>

            <h3>
              Premium Quality
            </h3>

            <p>
              हम केवल
              बेहतरीन
              प्रोडक्ट्स बेचते हैं।
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;