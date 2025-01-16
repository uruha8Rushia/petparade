import React from "react";
import "./Modal.css";
import { useCart } from "../CartContext"; // Import global cart context

const Modal = ({ isOpen, onClose, content, handleLogout }) => {
  const { cartItems, updateQuantity } = useCart(); // Use global cart state and methods

  if (!isOpen) return null;

  // Function to handle decrementing quantity and prompting for removal
  const handleDecrement = (id, quantity) => {
    if (quantity === 1) {
      const confirmRemoval = window.confirm("Do you want to remove this product from the cart?");
      if (confirmRemoval) {
        updateQuantity(id, -1); // Removes the item when quantity reaches 0
      }
    } else {
      updateQuantity(id, -1);
    }
  };

  const renderContent = () => {
    switch (content) {
      case "Favorite Items":
        return (
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
                {/* Sample favorite items, replace with actual data */}
                {[
                  {
                    id: 1,
                    name: "Favorite Item 1",
                    image: "/cart1.png", // Replace with your image path
                  },
                  {
                    id: 2,
                    name: "Favorite Item 2",
                    image: "/cart2.png", // Replace with your image path
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
        );
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
                      <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <span>
                Subtotal: $
                {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
          </>
        );
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
          </>
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
