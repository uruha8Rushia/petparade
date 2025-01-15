import React from "react";
import './Home.css';
import HomeImageCarousel from '../component/homeImageCarousel';
import HomeCard from '../component/HomeCard';

const Home = () => {
  const promoteImages = [
    { src: "/promoted-cover.png", alt: "Scroll Down For More Information" },
    { src: "/promoted-food.png", alt: "2024 Pet Food Best Seller" },
    { src: "/promoted-acces.png", alt: "Hot Deals Pet Accessories" },
    { src: "/promoted-delivery.png", alt: "Delivery Information" },
  ];

  const topSellerProducts = [
    {
      image: "/product1.jpg",
      name: "Amanova Cat Pouch 85g Kitten Chicken & Fish Complete Wet Cat Food",
      cost: "RM 3.99"
    },
    {
      image: "/product2.png",
      name: "Fluffy Cat Bed",
      cost: "RM xx"
    },
    {
      image: "/product3.png",
      name: "toy",
      cost: "RM xx"
    },
    {
      image: "/product4.png",
      name: "toy",
      cost: "RM xx"
    },
  ];

  const topSellerProducts2 = [
    {
      image: "/product1.jpg",
      name: "Amanova Cat Pouch 85g Kitten Chicken & Fish Complete Wet Cat Food",
      cost: "RM 3.99"
    },
    {
      image: "/product2.png",
      name: "Fluffy Cat Bed",
      cost: "RM xx"
    },
    {
      image: "/product3.png",
      name: "toy",
      cost: "RM xx"
    },
    {
      image: "/product4.png",
      name: "toy",
      cost: "RM xx"
    },
  ];

  const topSellerProducts3 = [
    {
      image: "/product1.jpg",
      name: "Amanova Cat Pouch 85g Kitten Chicken & Fish Complete Wet Cat Food",
      cost: "RM 3.99"
    },
    {
      image: "/product2.png",
      name: "Fluffy Cat Bed",
      cost: "RM xx"
    },
    {
      image: "/product3.png",
      name: "toy",
      cost: "RM xx"
    },
    {
      image: "/product4.png",
      name: "toy",
      cost: "RM xx"
    },
  ];

  return (
    <div className="home-page">
      <div className="title-container">
        <span className="line"></span>
        <span className="symbol">◊</span>
        <h1 className="title">Welcome To Pet Parade !</h1>
        <span className="symbol">◊</span>
        <span className="line"></span>
      </div>

      <div className="banner-section">
        <div className="banner-content">
          <HomeImageCarousel images={promoteImages} />
        </div>
      </div>

      <div className="title-container">
        <span className="line"></span>
        <span className="symbol">◊</span>
        <h1 className="title">Top Seller Products</h1>
        <span className="symbol">◊</span>
        <span className="line"></span>
      </div>

      <div className="home-subtitle">
        <h2>Cat</h2>
      </div>

      <div className="top-seller-section">
        {topSellerProducts.map((product, index) => (
          <HomeCard
            key={index}
            image={product.image}
            name={product.name}
            cost={product.cost}
          />
        ))}
      </div>
      <button className="top-seller-button">View More</button>

      <div className="home-subtitle">
        <h2>Dog</h2>
      </div>

      <div className="top-seller-section">
        {topSellerProducts2.map((product, index) => (
          <HomeCard
            key={index}
            image={product.image}
            name={product.name}
            cost={product.cost}
          />
        ))}
      </div>
      <button className="top-seller-button">View More</button>

      <div className="home-subtitle">
        <h2>Small Pet</h2>
      </div>

      <div className="top-seller-section">
        {topSellerProducts3.map((product, index) => (
          <HomeCard
            key={index}
            image={product.image}
            name={product.name}
            cost={product.cost}
          />
        ))}
      </div>
      <button className="top-seller-button">View More</button>
    </div>
  );
};

export default Home;
