import React, { useState, useEffect } from 'react';
import './Product.css';

const ProductCard = ({ product, openModal, addToFavorites }) => {
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
        <div className="love-btn" onClick={() => addToFavorites(product)}>
          <i className="fas fa-heart"></i>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ product, closeModal, addToCart, addToFavorites }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) => {
      if (action === 'increment') return prevQuantity + 1;
      if (action === 'decrement' && prevQuantity > 1) return prevQuantity - 1;
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        <img src={product.image} alt={product.name} className="modal-product-image" />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>

        <div className="quantity-wrapper">
          <label htmlFor="quantity" className="quantity-label">
            Quantity:
          </label>
          <div className="quantity-control">
            <button className="quantity-btn" onClick={() => handleQuantityChange('decrement')}>
              −
            </button>
            <input
              type="number"
              id="quantity"
              className="quantity-input"
              value={quantity}
              readOnly
            />
            <button className="quantity-btn" onClick={() => handleQuantityChange('increment')}>
              +
            </button>
          </div>
        </div>

        <div className="button-container">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <div className="love-btn" onClick={() => addToFavorites(product)}>
            <i className="fas fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductSection = ({ title, products, openModal, addToFavorites }) => {
  return (
    <div className="product-section">
      <h2>{title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            openModal={openModal}
            addToFavorites={addToFavorites}
          />
        ))}
      </div>
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]); // Store all products
  const [modalProduct, setModalProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch products from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/products') // Replace with your backend endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const openModal = (product) => {
    setModalProduct(product);
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  const addToCart = (product, quantity) => {
    setCart([...cart, { ...product, quantity }]);
  };

  const addToFavorites = (product) => {
    if (!favorites.find((item) => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  // Categorize products by category (if backend provides a `category` field)
  const catProducts = products.filter((product) => product.category === 'cat');
  const dogProducts = products.filter((product) => product.category === 'dog');
  const smallPetProducts = products.filter((product) => product.category === 'small-pet');

  return (
    <div className="product-page">
      <h1>Our Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <ProductSection
            title="Cat Products"
            products={catProducts}
            openModal={openModal}
            addToFavorites={addToFavorites}
          />
          <ProductSection
            title="Dog Products"
            products={dogProducts}
            openModal={openModal}
            addToFavorites={addToFavorites}
          />
          <ProductSection
            title="Small Pet Products"
            products={smallPetProducts}
            openModal={openModal}
            addToFavorites={addToFavorites}
          />
        </>
      )}

      {modalProduct && (
        <Modal
          product={modalProduct}
          closeModal={closeModal}
          addToCart={addToCart}
          addToFavorites={addToFavorites}
        />
      )}

      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="favorites">
        <h2>Your Favorites</h2>
        <ul>
          {favorites.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
