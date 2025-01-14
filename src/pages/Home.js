import React from "react";
import './Home.css';
import HomeImageCarousel from '../component/homeImageCarousel';

const Home = () => {
  const promoteImages = [
    { src: "/promoted-food.png", alt: "2024 Pet Food Best Seller" },
    { src: "/promoted-acces.png", alt: "Hot Deals Pet Accessories" },
  ];
  return (
    <div className="home-page">
      <div>
        <h1>Welcome to the Home Page!</h1>
      </div>

      <HomeImageCarousel images={promoteImages} />

    </div>
  );
};

export default Home;
