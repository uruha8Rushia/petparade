import React from "react";
import "./Modal.css";
import { useCart } from "../CartContext";
import { useFavourites } from "../Favourite";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Modal = ({ isOpen, onClose, content, handleLogout }) => {
  const { cartItems, updateQuantity } = useCart();
  const { favourites, removeFromFavourites } = useFavourites();
  const navigate = useNavigate(); // Initialize navigate

  if (!isOpen) return null;

  const handleDecrement = (id, quantity) => {
    if (quantity === 1) {
      const confirmRemoval = window.confirm("Do you want to remove this product from the cart?");
      if (confirmRemoval) {
        updateQuantity(id, -1);
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
                {favourites.map((item) => (
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
                        className="view-product-button"
                        onClick={() => {
                          onClose(); // Close the favorites modal
                          navigate("/product", { state: { product: item } }); // Navigate to product page
                        }}
                      >
                        View Product
                      </button>
                      <button
                        className="unfavourite-button"
                        onClick={() => removeFromFavourites(item.id)}
                      >
                        Unfavourite
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
