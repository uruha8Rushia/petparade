// about.js
import React from "react";
import "./About.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <img
          src="/logo.png" // Replace with your logo path
          alt="Logo"
          className="about-logo"
        />
        <h1 className="about-title">Pisces & Aqua Pet Concept Store</h1>
        <p className="about-tagline">For Pets & Pet Lovers</p>
      </header>

      <main className="about-main">
        <section className="about-story">
          <h2>Our Story</h2>
          <p>Dear all Pisces & Aqua Paw-friends!</p>
          <p>
            We’re a Pet Shop for Pets & Pet Lovers! Discover our pet treats &
            accessories, either homemade or hand-picked with love. We want to
            share only the best quality products for your beloved pets.
          </p>
          <ul>
            <li>Pet Food from Premium Brands</li>
            <li>Pet Supplies & Accessories</li>
            <li>Pet-Themed Items for Pet Lovers</li>
          </ul>
          <p>
            <strong>Company name:</strong> Pisces & Aqua Pet Concept Store<br />
            <strong>Company Registration No.:</strong> PG0380146-U
          </p>
        </section>

        <section className="about-feline-managers">
          <h2>Introduction of Our Feline Managers</h2>
          <p>
            Meet our adorable feline managers who ensure everything runs smoothly
            in the store!
          </p>
          {/* Add images and descriptions of feline managers here */}
        </section>
      </main>

      <footer className="about-footer">
        <p>&copy; 2025 Pisces & Aqua Pet Concept Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
