import React, { useState } from 'react';
import './Slideshow.css';

const Slideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="slideshow">
            <button className="slideshow-button" onClick={prevSlide}>❮</button>
            <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" />
            <button className="slideshow-button" onClick={nextSlide}>❯</button>
        </div>
    );
};

export default Slideshow;
