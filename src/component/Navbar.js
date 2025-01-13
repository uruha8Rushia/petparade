import React from "react";
import { NavLink, useLocation } from "react-router-dom";
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
          <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/product"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Product
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/FAQ"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              FAQ
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
