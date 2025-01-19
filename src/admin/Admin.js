import React, { useState, useEffect } from "react";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all products
  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError("Failed to load products"));
  }, []);

  // Add a new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const productToAdd = {
        ...newProduct,
        image: "product1.jpg", // Set default image for new products
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToAdd),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProducts([...products, createdProduct]);
        setNewProduct({ name: "", price: "", description: "" }); // Reset the form
      } else {
        setError("Failed to add product");
      }
    } catch {
      setError("Error adding product");
    } finally {
      setLoading(false);
    }
  };


  // Remove a product
  const handleRemoveProduct = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        setError("Failed to remove product");
      }
    } catch {
      setError("Error removing product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin - Manage Products</h1>

      {/* Add Product Section */}
      {/* Add Product Form */}
      <div className="add-product">
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button 
          className="add-btn" 
          onClick={handleAddProduct} disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>


      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Product List */}
      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image || "/default-image.png"} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: RM {product.price}</p>
            <p>{product.description}</p>
            {/* Add a Remove button */}
            <button 
              className="remove-btn" 
              onClick={() => handleRemoveProduct(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
