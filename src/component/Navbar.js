import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  // Determine if the current page is the home page
  const isHomePage = location.pathname === "/";

  return (
    <div
      className="header-container"
      style={{
        height: isHomePage ? "100vh" : "80px", // Full height on home page, smaller on others
        backgroundPosition: isHomePage ? "center" : "top",
        transition: "height 0.3s ease", // Smooth transition
      }}
    >
      <nav className="navbar">
        <img src="/nav_logo.png" alt="Logo" className="nav-logo" />
        <ul className="nav-list">
          {/* Search Bar */}
          <li className="nav-item search-bar-item">
            <form className="search-bar">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/product" className="nav-link">
              Product
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/FAQ" className="nav-link">
              FAQs
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
