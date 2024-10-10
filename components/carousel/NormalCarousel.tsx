'use client';
import React, { useState } from 'react';
import styles from './Carousel.module.css';

const NormalCarousel = () => {
    const images = [
        'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Slide+1',
        'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=Slide+2',
        'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=Slide+3',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    return (
        <div className={styles.container}>
            <p>Normal Carousel</p>
            <div className={styles.carousel}>
                <button className={`${styles.carouselButton} ${styles.prev}`} onClick={prevSlide}>
                    &#10094;
                </button>
                <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                <button className={`${styles.carouselButton} ${styles.next}`} onClick={nextSlide}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default NormalCarousel;
