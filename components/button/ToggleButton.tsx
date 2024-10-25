'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80px;
    justify-content: space-between;
    margin-bottom: 30px;
`;

// 스위치 토글 버튼
const SwitchToggleButton = styled.button<{ active: boolean }>`
    width: 60px;
    height: 30px;
    border-radius: 15px;
    background-color: ${({ active }) => (active ? 'lightgreen' : '#ccc')};
    position: relative;
    border: none;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        top: 3px;
        left: ${({ active }) => (active ? '30px' : '3px')};
        width: 24px;
        height: 24px;
        background-color: white;
        border-radius: 50%;
        transition: 0.3s;
    }
`;

// 아이콘 토글 버튼
const IconToggleButton = styled.button<{ active: boolean }>`
    font-size: 24px;
    color: ${({ active }) => (active ? 'gold' : '#333')};
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

// 체크박스 스타일 토글 버튼
const CheckboxToggleButton = styled.button<{ active: boolean }>`
    width: 100px;
    height: 50px;
    border-radius: 10px;
    background-color: ${({ active }) => (active ? 'skyblue' : '#eee')};
    border: 2px solid ${({ active }) => (active ? 'dodgerblue' : '#ddd')};
    color: ${({ active }) => (active ? 'white' : '#666')};
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        opacity: 0.9;
    }
`;

const ToggleButton = () => {
    const [isSwitchActive, setIsSwitchActive] = useState(false);
    const [isIconActive, setIsIconActive] = useState(false);
    const [isCheckboxActive, setIsCheckboxActive] = useState(false);

    return (
        <ButtonWrap>
            <ButtonContainer>
                <p>Switch Toggle Button</p>
                <SwitchToggleButton active={isSwitchActive} onClick={() => setIsSwitchActive(!isSwitchActive)} />
            </ButtonContainer>

            <ButtonContainer>
                <p>Icon Toggle Button</p>
                <IconToggleButton active={isIconActive} onClick={() => setIsIconActive(!isIconActive)}>
                    {isIconActive ? '★' : '☆'}
                </IconToggleButton>
            </ButtonContainer>

            <ButtonContainer>
                <p>Checkbox Style Toggle Button</p>
                <CheckboxToggleButton active={isCheckboxActive} onClick={() => setIsCheckboxActive(!isCheckboxActive)}>
                    {isCheckboxActive ? 'Active' : 'Inactive'}
                </CheckboxToggleButton>
            </ButtonContainer>
        </ButtonWrap>
    );
};

export default ToggleButton;
