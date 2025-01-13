import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [modalContent, setModalContent] = useState(null); // Tracks content of modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks modal visibility

  // Cart items with state to allow updates
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "INGROWN FACE DUO",
      price: 60,
      quantity: 1,
      image: "/cart1.png", // Replace with your image path
    },
    {
      id: 2,
      name: "Route Package Protection",
      price: 1,
      quantity: 1,
      image: "/cart2.png", // Replace with your image path
    },
  ]);

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

  // Function to update quantity
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change), // Prevent quantity from going below 1
            }
          : item
      )
    );
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
          <div
            className={`modal-content ${
              modalContent === "Cart Items"
                ? "cart-modal"
                : modalContent === "Favorite Items"
                ? "favorites-modal"
                : "user-profile-modal"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            {modalContent === "Favorite Items" && (
            <>
              <h2>Your Favorites</h2>
              <table className="favorites-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      name: "Favorite Item 1",
                      image: "/favorite1.png", // Replace with your image path
                    },
                    {
                      id: 2,
                      name: "Favorite Item 2",
                      image: "/favorite2.png", // Replace with your image path
                    },
                  ].map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="favorite-item">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="favorite-item-image"
                          />
                          <span className="item-name">{item.name}</span>
                        </div>
                      </td>
                      <td>
                        <button
                          className="add-to-cart-button"
                          onClick={() => console.log(`Add ${item.name} to cart`)}
                        >
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
            {modalContent === "Cart Items" && (
              <>
                <h2>Your Cart</h2>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <span className="item-name">{item.name}</span>
                          </div>
                        </td>
                        <td>${item.price}</td>
                        <td>
                          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </td>
                        <td>${item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="cart-summary">
                  <span>
                    Subtotal: $
                    {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                  </span>
                </div>
              </>
            )}
            {modalContent === "User Profile" && (
              <>
                <h2>User Profile</h2>
                <div className="user-profile">
                  <img src="/profile.png" alt="Profile" className="profile-picture" />
                  <div className="user-info">
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Email:</strong> john.doe@example.com</p>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Account Type:</strong> Premium</p>
                    <p><strong>Member Since:</strong> January 2021</p>
                  </div>
                  <div class="tab-buttons">
                    <button class="tab-button active" data-tab="edit">View Profile</button>
                    <button class="tab-button" data-tab="order-history">View Order History</button>
                    <button class="tab-button" data-tab="addresses">Manage Addresses</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
