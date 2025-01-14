import React, { useState } from 'react';
import './homeImageCarousel.css';

const HomeImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel-container">
            <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
            />
            <button className="carousel-button prev" onClick={prevImage}>
                &#10094;
            </button>
            <button className="carousel-button next" onClick={nextImage}>
                &#10095;
            </button>

            {/* Slider Dots */}
            <div className="slider-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default HomeImageCarousel;
