'use client';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const CarouselWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 600px;
    height: 300px;
    margin: 0 auto;
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    transition: opacity 0.5s ease;
`;

const Button = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    z-index: 10;
`;

const PrevButton = styled(Button)`
    left: 10px;
`;

const NextButton = styled(Button)`
    right: 10px;
`;

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
        <Container>
            <p>Normal Carousel</p>
            <CarouselWrapper>
                <PrevButton onClick={prevSlide}>&#10094;</PrevButton>
                <Image src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                <NextButton onClick={nextSlide}>&#10095;</NextButton>
            </CarouselWrapper>
        </Container>
    );
};

export default NormalCarousel;
