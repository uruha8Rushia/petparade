import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    console.log("Adding to cart:", product, quantity); // Debugging
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  // Updated Update Quantity Function
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            // If the quantity is 1 and the user clicks decrease
            if (item.quantity === 1 && change === -1) {
              if (window.confirm("Do you want to remove this item from the cart?")) {
                return null; // Remove the item
              }
              return item; // Keep the item if the user cancels
            }
            return { ...item, quantity: item.quantity + change };
          }
          return item;
        })
        .filter(Boolean) // Remove null items (items to be deleted)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
