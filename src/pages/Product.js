import React from 'react';
import ProductCard from '../component/ProductCard';
import './Product.css';

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$19.99',
    description: 'This is a great product.',
    image: 'product1.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$29.99',
    description: 'This is another great product.',
    image: 'product2.jpg',
  },
  {
    id: 3,
    name: 'Product 3',
    price: '$29.99',
    description: 'This is another great product.',
    image: 'product2.jpg',
  },
  {
    id: 4,
    name: 'Product 4',
    price: '$29.99',
    description: 'This is another great product.',
    image: 'product2.jpg',
  },
  // Add more products as needed
];

const Product = () => {
  return (
    <div className="product-page">
      <h1>Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
