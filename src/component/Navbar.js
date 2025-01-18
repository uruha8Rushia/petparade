import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useCart } from "../CartContext";
import { useFavourites } from "../Favourite";
import "./Navbar.css";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const { cartItems } = useCart();
  const { favourites, setFavourites } = useFavourites();
  const navigate = useNavigate();

  // Fetch favourites for the logged-in user
  useEffect(() => {
    const fetchFavourites = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        setFavourites([]);
        return;
      }

      try {
        const response = await fetch(`/api/favourites?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          setFavourites(data);
        } else {
          console.error("Failed to fetch favourites");
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [setFavourites]);

  // Fetch user profile data when the modal is opened
  const fetchUserProfile = async () => {
    const username = localStorage.getItem("username");
    if (!username) return;
  
    try {
      const response = await fetch(`/api/user?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserProfile({
          name: data.username || "Unknown",
          email: data.email || "Unknown",
          profilePicture: data.profilePicture || "/default-profile.png",
        }); // Set user profile state
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  

  const openModal = (content, product = null) => {
    setModalContent(content);
    setSelectedProduct(product);
    setIsModalOpen(true);

    if (content === "User Profile") {
      fetchUserProfile(); // Fetch user profile when modal opens
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setSelectedProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setFavourites([]);
    navigate("/login");
    closeModal();
    console.log("User logged out");
  };

  const handleProductSelect = (product) => {
    navigate("/product", { state: { product } });
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <>
      <nav className="navbar">
        <img src="/nav_logo.png" alt="Logo" className="nav-logo" />

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

        <div className="nav-tools">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="button" className="search-button">
              <i className="fas fa-search"></i>
            </button>

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
            <div className="nav-icon" onClick={() => openModal("Favorite Items")}>
              <i className="fas fa-heart"></i>
              {favourites.length > 0 && (
                <span className="favorites-count">{favourites.length}</span>
              )}
            </div>
            <div className="nav-icon" onClick={() => openModal("Cart Items")}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartItems.length}</span>
            </div>
            <div className="nav-icon" onClick={() => openModal("User Profile")}>
              <img src="/cat_user.png" alt="User Icon" className="custom-user-icon" />
            </div>
          </div>
        </div>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        selectedProduct={selectedProduct}
        handleLogout={handleLogout}
        userProfile={userProfile}
      />
    </>
  );
};

export default Navbar;