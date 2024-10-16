'use client';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 400px;
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
    cursor: grab;
`;

interface CarouselTrackProps {
    currentIndex: number;
    isDragging: boolean;
    dragOffset: number;
}

const CarouselTrack = styled.div<CarouselTrackProps>`
    display: flex;
    transition: ${({ isDragging }) => (isDragging ? 'none' : 'transform 0.5s ease-in-out')};
    transform: ${({ currentIndex, dragOffset }) => `translateX(calc(-${currentIndex * 600}px + ${dragOffset}px))`};
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

const CursorCarousel: React.FC = () => {
    const images: string[] = [
        'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Slide+1',
        'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=Slide+2',
        'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=Slide+3',
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [dragOffset, setDragOffset] = useState<number>(0);

    const carouselRef = useRef<HTMLDivElement>(null);

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleMouseDown = (e: React.MouseEvent): void => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent): void => {
        if (!isDragging) return;
        const offset = e.clientX - startX;
        setDragOffset(offset);
    };

    const handleMouseUp = (): void => {
        setIsDragging(false);
        if (Math.abs(dragOffset) > 100) {
            if (dragOffset > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        setDragOffset(0);
    };

    // 이미지 클릭 시 드래그 방지
    const handleDragStart = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <Container>
            <Title>Mouse Cursor Carousel</Title>
            <CarouselWrapper
                ref={carouselRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <CarouselTrack currentIndex={currentIndex} isDragging={isDragging} dragOffset={dragOffset}>
                    {images.map((image, index) => (
                        <Slide key={index} src={image} alt={`Slide ${index + 1}`} onDragStart={handleDragStart} />
                    ))}
                </CarouselTrack>
                <PrevButton onClick={prevSlide}>&#10094;</PrevButton>
                <NextButton onClick={nextSlide}>&#10095;</NextButton>
            </CarouselWrapper>
        </Container>
    );
};

export default CursorCarousel;
