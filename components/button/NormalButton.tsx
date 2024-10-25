'use client';

import React from 'react';
import styled from 'styled-components';

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
`;

const Button = styled.button`
    width: 150px;
    height: 80px;
    border-radius: 20px;
    background-color: skyblue;
    margin-top: 10px;
    border: none;
    font-size: 18px;

    transition: transform 0.1s ease;

    &:hover {
        background-color: lightblue;
    }

    &:active {
        transform: scale(0.95); /* 버튼을 살짝 눌린 효과 */
    }
`;

const NormalButton = () => {
    return (
        <ButtonWrap>
            <p>NormalButton</p>
            <Button>
                <p>Click</p>
            </Button>
        </ButtonWrap>
    );
};

export default NormalButton;
