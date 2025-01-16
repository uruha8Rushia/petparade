import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, content, handleLogout }) => {
  const [cartItems, setCartItems] = useState([
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (content) {
      case "Cart Items":
        return (
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
        );
      case "Favorite Items":
        return <h2>Your Favorites</h2>; // Add favorite items here.
      case "User Profile":
        return (
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
            <div className="tab-buttons">
              <button className="tab-button active">View Profile</button>
              <button className="tab-button">View Order History</button>
              <button className="tab-button" onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </> // Add profile details here.
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
