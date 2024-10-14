'use client';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.p`
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 24px;
    text-align: center;
`;

const CarouselWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 600px;
    height: 300px;
    overflow: hidden;
`;

interface CarouselTrackProps {
    currentIndex: number;
}

const CarouselTrack = styled.div<CarouselTrackProps>`
    display: flex;
    transition: transform 0.5s ease-in-out;
    transform: ${({ currentIndex }) => `translateX(-${currentIndex * 600}px)`};
`;

const Slide = styled.img`
    min-width: 600px;
    height: auto;
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

const SlidingCarousel: React.FC = () => {
    const images: string[] = [
        'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Slide+1',
        'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=Slide+2',
        'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=Slide+3',
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Container>
            <Title>Sliding Carousel</Title>
            <CarouselWrapper>
                <CarouselTrack currentIndex={currentIndex}>
                    {images.map((image, index) => (
                        <Slide key={index} src={image} alt={`Slide ${index + 1}`} />
                    ))}
                </CarouselTrack>
                <PrevButton onClick={prevSlide}>&#10094;</PrevButton>
                <NextButton onClick={nextSlide}>&#10095;</NextButton>
            </CarouselWrapper>
        </Container>
    );
};

export default SlidingCarousel;
