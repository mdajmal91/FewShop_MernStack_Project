import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import "../style/navbar.css"

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const location = useLocation();
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    // Close mobile menu when navigating
    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setMobileMenuOpen(false);
        }
    };

    // Check if link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        logout();
        setShowUserDropdown(false);
        navigate("/");
    };

    return (
        <nav className={`navbar ${isActive("/shop") ? "navbar-shop-active" : isActive("/about") ? "navbar-about-active" : ""}`}>
            <div className="navbar-container">
                {/* Logo Section */}
                <div className="navbar-brand">
                    <Link to="/" className="logo" onClick={handleNavClick}>
                        <div className="logo-glow-wrapper">
                            <div className="navbar-logo-icon">F</div>
                        </div>
                        <span className="logo-text">FewShop</span>
                    </Link>
                </div>

                {/* Search Bar - Desktop */}
                <div className="navbar-search-desktop">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search products, brands, and more..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-button">
                            🔍
                        </button>
                    </form>
                </div>

                {/* Navigation Links - Desktop */}
                <ul className="navbar-links-desktop">
                    <li>
                        <Link 
                            to="/shop" 
                            className={`nav-link ${isActive("/shop") ? "active" : ""}`}
                            onClick={handleNavClick}
                        >
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/about" 
                            className={`nav-link ${isActive("/about") ? "active" : ""}`}
                            onClick={handleNavClick}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/contact" 
                            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                            onClick={handleNavClick}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Right Side Icons */}
                <div className="navbar-right">
                    {/* Cart Icon */}
                    <Link to="/cart" className="nav-icon cart-icon" onClick={handleNavClick}>
                        <span className="icon">🛒</span>
                        {cartItems && cartItems.length > 0 && (
                            <span className="cart-badge">{cartItems.length}</span>
                        )}
                        <span className="cart-text">Cart</span>
                    </Link>

                    {/* Profile Link (Added after Cart) */}
                    {user && (
                        <Link to="/profile" className={`nav-icon ${isActive("/profile") ? "active" : ""}`} onClick={handleNavClick}>
                            <span className="icon">👤</span>
                            <span className="login-text">Profile</span>
                        </Link>
                    )}

                    {/* User Account / Auth */}
                    {user ? (
                        <div className="user-menu">
                            <button
                                className="nav-icon user-icon"
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                            >
                                <span className="icon">👤</span>
                                <span className="user-initial">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </span>
                            </button>

                            {/* User Dropdown Menu */}
                            {showUserDropdown && (
                                <div className="user-dropdown">
                                    <div className="dropdown-header">
                                        <p className="user-name">{user.name}</p>
                                        <p className="user-email">{user.email}</p>
                                    </div>
                                    <hr className="dropdown-divider" />
                                    <Link
                                        to="/profile"
                                        className="dropdown-link"
                                        onClick={() => {
                                            setShowUserDropdown(false);
                                            handleNavClick();
                                        }}
                                    >
                                        👤 My Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="dropdown-link"
                                        onClick={() => {
                                            setShowUserDropdown(false);
                                            handleNavClick();
                                        }}
                                    >
                                        📦 My Orders
                                    </Link>
                                    <Link
                                        to="/wishlist"
                                        className="dropdown-link"
                                        onClick={() => {
                                            setShowUserDropdown(false);
                                            handleNavClick();
                                        }}
                                    >
                                        ❤️ Wishlist
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="dropdown-link"
                                        onClick={() => {
                                            setShowUserDropdown(false);
                                            handleNavClick();
                                        }}
                                    >
                                        ⚙️ Settings
                                    </Link>
                                    
                                    {user.isAdmin && (
                                        <>
                                            <hr className="dropdown-divider" />
                                            <Link
                                                to="/admin"
                                                className="dropdown-link admin-link"
                                                onClick={() => {
                                                    setShowUserDropdown(false);
                                                    handleNavClick();
                                                }}
                                            >
                                                📊 Admin Dashboard
                                            </Link>
                                        </>
                                    )}
                                    
                                    <hr className="dropdown-divider" />
                                    <button
                                        onClick={handleLogout}
                                        className="dropdown-link logout-link"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-nav-links" style={{ display: 'flex', gap: '15px' }}>
                            <Link to="/login" className="nav-icon login-icon" onClick={handleNavClick}>
                                <span className="icon">🔐</span>
                                <span className="login-text">Login</span>
                            </Link>
                            <Link to="/register" className="nav-icon register-icon" onClick={handleNavClick}>
                                <span className="icon">📝</span>
                                <span className="login-text">Register</span>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <span className="hamburger">
                            <span className={mobileMenuOpen ? "active" : ""}></span>
                            <span className={mobileMenuOpen ? "active" : ""}></span>
                            <span className={mobileMenuOpen ? "active" : ""}></span>
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mobile-search-form">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="mobile-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="mobile-search-button">
                            🔍
                        </button>
                    </form>

                    {/* Mobile Navigation Links */}
                    <ul className="mobile-nav-links">
                        <li>
                            <Link to="/shop" onClick={handleNavClick}>
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={handleNavClick}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={handleNavClick}>
                                Contact
                            </Link>
                        </li>
                        <li className="mobile-cart-link">
                            <Link to="/cart" onClick={handleNavClick}>
                                Cart ({cartItems?.length || 0})
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile User Section */}
                    {user ? (
                        <div className="mobile-user-section">
                            <p className="mobile-user-name">Hi, {user.name}!</p>
                            <Link to="/profile" className="mobile-link" onClick={handleNavClick}>
                                My Profile
                            </Link>
                            <Link to="/orders" className="mobile-link" onClick={handleNavClick}>
                                My Orders
                            </Link>
                            <Link to="/wishlist" className="mobile-link" onClick={handleNavClick}>
                                Wishlist
                            </Link>
                            {user.isAdmin && (
                                <Link to="/admin" className="mobile-link admin-link" onClick={handleNavClick}>
                                    Admin Dashboard
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                className="mobile-logout-button"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="mobile-auth-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
                            <Link to="/login" className="mobile-login-button" onClick={handleNavClick}>
                                Login
                            </Link>
                            <Link to="/register" className="mobile-register-button" style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', textDecoration: 'none', color: '#333' }} onClick={handleNavClick}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar;