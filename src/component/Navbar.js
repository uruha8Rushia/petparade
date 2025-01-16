import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useCart } from "../CartContext";
import { useFavourites } from "../Favourite";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalContent, setModalContent] = useState(""); // Modal content
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [searchResults, setSearchResults] = useState([]); // Search results state
  const [products, setProducts] = useState([]); // Store all products for search

  const { cartItems } = useCart(); // Access cart items from CartContext
  const { favourites, toggleFavourite } = useFavourites(); // Access favourites and toggle function
  const navigate = useNavigate(); // Hook for navigation

  // Fetch products from the backend for search functionality
  useEffect(() => {
    fetch("/api/products") // Replace with your backend endpoint
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle search logic
  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>
        product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProductSelect = (product) => {
    navigate("/product", { state: { product } }); // Navigate to product page and pass product data
    setSearchTerm(""); // Clear search term
    setSearchResults([]); // Clear search results
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar state
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); // Close the sidebar
  };

  const openModal = (content, product = null) => {
    setModalContent(content); // Set the modal content dynamically
    setSelectedProduct(product); // Set the selected product if provided
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalContent(""); // Clear the modal content
    setSelectedProduct(null); // Clear the selected product
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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="button" className="search-button">
              <i className="fas fa-search"></i>
            </button>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="search-result-item"
                    onClick={() => handleProductSelect(product)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="nav-icons">
            <div
              className="nav-icon"
              onClick={() => openModal("Favorite Items")}
            >
              <i className="fas fa-heart"></i>
            </div>
            <div
              className="nav-icon"
              onClick={() => openModal("Cart Items")}
            >
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartItems.length}</span>
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
        selectedProduct={selectedProduct}
        handleLogout={handleLogout}
        openModal={openModal}
      />
    </>
  );
};

export default Navbar;
