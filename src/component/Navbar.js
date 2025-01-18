import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useCart } from "../CartContext";
import { useFavourites } from "../Favourite";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);

  const { cartItems } = useCart(); // Access cart items
  const { favourites, setFavourites } = useFavourites(); // Access favourites from FavouriteContext
  const navigate = useNavigate();

  // Fetch products from the backend for search functionality
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Fetch favourites for the logged-in user on component mount
  useEffect(() => {
    const fetchFavourites = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        setFavourites([]); // Clear favourites if no user is logged in
        return;
      }

      try {
        const response = await fetch(`/api/favourites?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          setFavourites(data); // Update favourites state with backend data
        } else {
          console.error("Failed to fetch favourites");
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [setFavourites]);

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
    navigate("/product", { state: { product } });
    setSearchTerm("");
    setSearchResults([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = (content, product = null) => {
    setModalContent(content);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setSelectedProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear username from localStorage
    setFavourites([]); // Clear favourites state
    navigate("/login"); // Redirect to the login page
    closeModal();
    console.log("User logged out");
  };

  return (
    <>
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
              {favourites.length > 0 && (
                <span className="favorites-count">{favourites.length}</span>
              )}
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
