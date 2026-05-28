import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../style/shop.css';
import { formatCurrency } from '../components/currency';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [maxAvailablePrice, setMaxAvailablePrice] =
    useState(10000);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          'http://localhost:5000/api/products'
        );

        const data = await response.json();

        const productsArray = Array.isArray(data)
          ? data
          : data.products || [];

        setProducts(productsArray);

        if (productsArray.length > 0) {
          const max = Math.ceil(
            Math.max(
              ...productsArray.map((p) => p.price)
            )
          );

          setMaxAvailablePrice(max);
          setMaxPrice(max);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  // Categories
  const categories = [
    'All',
    ...new Set(
      products
        .map((p) => p.category)
        .filter(Boolean)
    ),
  ];

  // Filter Logic
  const filteredProducts = products.filter(
    (product) => {
      const matchCategory =
        filter === 'All' ||
        product.category === filter;

      const matchSearch =
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchPrice =
        product.price >= minPrice &&
        product.price <= maxPrice;

      return (
        matchCategory &&
        matchSearch &&
        matchPrice
      );
    }
  );

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sortBy === 'price-low')
        return a.price - b.price;

      if (sortBy === 'price-high')
        return b.price - a.price;

      return 0;
    }
  );

  // Reset Filters
  const resetFilters = () => {
    setFilter('All');
    setSortBy('default');
    setSearchTerm('');
    setMinPrice(0);
    setMaxPrice(maxAvailablePrice);
  };

  return (
    <div className="shop-page">

      {/* Header */}
      <div className="shop-header">
        <h1>🛍 Explore Our Collection</h1>
        <p>
          Premium products with best prices
          & luxury shopping experience
        </p>
      </div>

      {/* Filter Card */}
      <div className="filter-card">

        {/* Search */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        {/* Categories */}
        <div className="category-wrapper">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={
                filter === cat
                  ? 'category-btn active'
                  : 'category-btn'
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="sort-wrapper">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="default">
              Default Sorting
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>
          </select>
        </div>

        {/* Price Range */}
        <div className="price-card">

          <div className="price-header">
            <span>
              Min:
              {formatCurrency(minPrice)}
            </span>

            <span>
              Max:
              {formatCurrency(maxPrice)}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={maxAvailablePrice}
            value={minPrice}
            onChange={(e) =>
              setMinPrice(Number(e.target.value))
            }
            className="slider"
          />

          <input
            type="range"
            min="0"
            max={maxAvailablePrice}
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Number(e.target.value))
            }
            className="slider"
          />
        </div>

        {/* Buttons */}
        <div className="button-group">

          <button
            className="reset-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>

        </div>
      </div>

      {/* Products */}
      {loading ? (
        <div className="loader-box">
          <div className="spinner"></div>
          <p>Loading Products...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No Products Found 😔</h2>
          <p>
            Try changing filters or search
            keyword.
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;