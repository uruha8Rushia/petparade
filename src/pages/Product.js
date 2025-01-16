import React, { useState, useEffect } from "react";
import "./Product.css";
import { useLocation } from "react-router-dom";
import { useCart } from "../CartContext"; // Import CartContext to use global cart state
import { useFavourites } from "../Favourite";

const ProductCard = ({ product, openModal }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites(); // Use global favorites context
  const [statusMessage, setStatusMessage] = useState(""); // State to track status message
  const isFavorited = favourites.some((item) => item.id === product.id); // Check if product is favorited

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavourites(product.id);
      setStatusMessage(`Removed ${product.name} from favorites`);
    } else {
      addToFavourites(product);
      setStatusMessage(`Added ${product.name} to favorites`);
    }

    // Clear the status message after 3 seconds
    setTimeout(() => setStatusMessage(""), 3000);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price}</p>
      <p className="product-description">{product.description}</p>
      <div className="button-container">
        <button className="add-to-cart" onClick={() => openModal(product)}>
          Add to Cart
        </button>
        <div
          className="love-btn"
          onClick={handleFavoriteClick}
          style={{ color: isFavorited ? "red" : "black" }}
        >
          <i className="fas fa-heart"></i>
        </div>
      </div>
      {/* Display status message */}
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

const Modal = ({ product, closeModal, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) => {
      if (action === "increment") return prevQuantity + 1;
      if (action === "decrement" && prevQuantity > 1) return prevQuantity - 1;
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // Use global addToCart
    closeModal();
  };

  const totalPrice = (product.price * quantity).toFixed(2); // Calculate total price

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        <img src={product.image} alt={product.name} className="modal-product-image" />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: RM {totalPrice}</p> {/* Dynamically updated price */}

        <div className="quantity-wrapper">
          <label htmlFor="quantity" className="quantity-label">
            Quantity:
          </label>
          <div className="quantity-control">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange("decrement")}
            >
              −
            </button>
            <input
              type="number"
              id="quantity"
              className="quantity-input"
              value={quantity}
              readOnly
            />
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
          </div>
        </div>

        <div className="button-container">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductSection = ({ title, products, openModal }) => {
  return (
    <div className="product-section">
      <h2>{title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} openModal={openModal} />
        ))}
      </div>
    </div>
  );
};

const Product = () => {
  const { addToCart } = useCart(); // Use global addToCart from CartContext
  const [products, setProducts] = useState([]); // Store all products
  const [modalProduct, setModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch products from the backend
  useEffect(() => {
    fetch("/api/products") // Replace with your backend endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  const openModal = (product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalProduct(null);
    setIsModalOpen(false);
  };

  // Categorize products by category (if backend provides a category field)
  const catProducts = products.filter((product) => product.category === "cat");
  const dogProducts = products.filter((product) => product.category === "dog");
  const smallPetProducts = products.filter(
    (product) => product.category === "small-pet"
  );

  const location = useLocation();
  const { state } = location;
  const preselectedProduct = state?.product; // Check if product was passed

  useEffect(() => {
    if (preselectedProduct) {
      openModal(preselectedProduct); // Automatically open modal
    }
  }, [preselectedProduct]);

  return (
    <div className="product-page">
      <h1>Our Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <ProductSection title="Cat Products" products={catProducts} openModal={openModal} />
          <ProductSection title="Dog Products" products={dogProducts} openModal={openModal} />
          <ProductSection
            title="Small Pet Products"
            products={smallPetProducts}
            openModal={openModal}
          />
        </>
      )}

      {isModalOpen && modalProduct && (
        <Modal
          product={modalProduct}
          closeModal={closeModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default Product;
