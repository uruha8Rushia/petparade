import React, { useState, useEffect } from "react";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", category: "", image: "" });
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
      if (!newProduct.name || !newProduct.price || !newProduct.category) {
          setError("Please fill out all fields");
          return;
      }

      setLoading(true);
      setError("");
      try {
          const productToAdd = {
              ...newProduct,
              image: "product1.jpg", // Default image for new products
          };

          const response = await fetch("/api/products", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(productToAdd),
          });

          const result = await response.text(); // Capture backend response

          if (response.ok) {
              const createdProduct = JSON.parse(result);
              setProducts([...products, createdProduct]);
              setNewProduct({ name: "", price: "", description: "", category: "" }); // Reset form
          } else {
              setError(result); // Display backend error message
          }
      } catch (err) {
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
        // Re-fetch products from the backend to ensure updated data
        const updatedResponse = await fetch("/api/products");
        const updatedProducts = await updatedResponse.json();
        setProducts(updatedProducts);
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
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="category-select"
        >
          <option value="">Select Product Category</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="small-pet">Small Pet</option>
        </select>
        <button className="add-btn" onClick={handleAddProduct} disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image || "/default-image.png"} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: RM {product.price}</p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
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
