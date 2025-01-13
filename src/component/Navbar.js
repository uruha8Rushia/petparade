import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [modalContent, setModalContent] = useState(null); // Tracks content of modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks modal visibility

  // Function to open the modal
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

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
          {/* Icons Section */}
          <li className="nav-item nav-icons">
            <div className="nav-icon" onClick={() => openModal("Favorite Items")}>
              <i className="fas fa-heart"></i> {/* Favorite Icon */}
            </div>
            <div className="nav-icon" onClick={() => openModal("Cart Items")}>
              <i className="fas fa-shopping-cart"></i> {/* Cart Icon */}
            </div>
            <div className="nav-icon" onClick={() => openModal("User Profile")}>
            <img src="/cat_user.png" alt="User Icon" className="custom-user-icon" /> {/* User Icon */}
            </div>
          </li>
        </ul>
      </nav>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>{modalContent}</h2>
            <p>This is the content for the {modalContent} modal.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
