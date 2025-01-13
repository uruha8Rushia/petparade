// about.js
import React from "react";
import "./About.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <img
          src="/1600w-KBBZLdpjLcM.webp" // Replace with your desired image path
          alt="Header"
          className="about-header-image"
        />
        <div className="header-text-overlay">
          <h1 className="header-title">Pet Parade</h1>
          <p className="header-description">
            A sanctuary of premium pet essentials, thoughtfully curated with care, elegance, and dedication.
          </p>
        </div>
      </header>

      <main className="about-main">
        <section className="services-section">
          <h2 className="services-title">Our Services</h2>
          <p className="services-description">
            We offer a wide range of premium services for you and your furry companions.
          </p>
          <div className="services-grid">
            <div className="service-card">
              <img src="/care-advice.jpg" alt="Care Advice" className="service-image" />
              <h3 className="service-title">Care Advice</h3>
              <p className="service-description">
                Expert advice to keep your pets happy and healthy.
              </p>
            </div>
            <div className="service-card">
              <img src="/veterinary-help.jpg" alt="Veterinary Help" className="service-image" />
              <h3 className="service-title">Veterinary Help</h3>
              <p className="service-description">
                Professional care for your pets' medical needs.
              </p>
            </div>
            <div className="service-card">
              <img src="/our-tips.jpg" alt="Our Tips" className="service-image" />
              <h3 className="service-title">Our Tips</h3>
              <p className="service-description">
                Handy tips for grooming, training, and more.
              </p>
            </div>
          </div>
        </section>

        {/* New Section: Image on the left and description on the right */}
        <section className="image-description-section">
          <img
            src="/050a1a3cfac4c857105469438327eaa7.jpg" // Replace with your desired image path
            alt="Cat"
            className="description-image"
          />
          <div className="description-content">
            <h2 className="description-title">About Us</h2>
            <p className="description-text">
              Pet Parade is born out of a passion for enhancing the lives of pets and their owners. We provide top-quality pet accessories and products, ensuring your furry friends receive the care and comfort they deserve. From delightful treats to functional gear, every item is thoughtfully selected to meet your pet's needs.
            </p>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <p>&copy; 2025 Pet Parade. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
