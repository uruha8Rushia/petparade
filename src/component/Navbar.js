import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import { useCart } from "../CartContext"; // Import CartContext to use global cart state
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalContent, setModalContent] = useState(""); // Modal content

  const { cartItems, updateQuantity } = useCart(); // Access cart items and updateQuantity from CartContext

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar state
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); // Close the sidebar
  };

  const openModal = (content) => {
    setModalContent(content); // Set the modal content dynamically
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalContent(""); // Clear the modal content
  };

  const handleLogout = () => {
    console.log("User logged out");
    closeModal();
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <img src="/nav_logo.png" alt="Logo" className="nav-logo" />

        {/* NavLinks */}
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/Home" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/product" className="nav-link">
              Product
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/FAQ" className="nav-link">
              FAQs
            </NavLink>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>

        {/* Search Bar and Icons */}
        <div className="nav-tools">
          <form className="search-bar">
            <input type="text" placeholder="Search" className="search-input" />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="nav-icons">
            <div
              className="nav-icon"
              onClick={() => openModal("Favorite Items")}
            >
              <i className="fas fa-heart"></i>
            </div>
            <div className="nav-icon" onClick={() => openModal("Cart Items")}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartItems.length}</span> {/* Dynamic cart count */}
            </div>
            <div
              className="nav-icon"
              onClick={() => openModal("User Profile")}
            >
              <img
                src="/cat_user.png"
                alt="User Icon"
                className="custom-user-icon"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "visible" : ""}`}>
          <button className="close-button" onClick={closeSidebar}>
            ✖
          </button>
          <ul className="sidebar-list">
            <li className="sidebar-item" onClick={closeSidebar}>
              <NavLink to="/Home" className="sidebar-link">
                Home
              </NavLink>
            </li>
            <li className="sidebar-item" onClick={closeSidebar}>
              <NavLink to="/about" className="sidebar-link">
                About Us
              </NavLink>
            </li>
            <li className="sidebar-item" onClick={closeSidebar}>
              <NavLink to="/product" className="sidebar-link">
                Product
              </NavLink>
            </li>
            <li className="sidebar-item" onClick={closeSidebar}>
              <NavLink to="/FAQ" className="sidebar-link">
                FAQs
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        cartItems={cartItems} // Pass cart items from CartContext
        updateQuantity={updateQuantity} // Pass updateQuantity function
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
