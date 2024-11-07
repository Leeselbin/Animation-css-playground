'use client';

import { useState } from "react";
import styled from 'styled-components';

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 20px;
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
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        color: ${({ active }) => (active ? 'red' : '#777')};
        font-size: 12px;
        font-weight: bold;
        margin: 0;
        z-index: 2;  // 텍스트가 원 위에 오도록
    }

    &::before {
        content: '';
        position: absolute;
        top: 3px;
        left: ${({ active }) => (active ? '30px' : '3px')};  // 원의 좌우 이동
        width: 24px;
        height: 24px;
        background-color: white;
        border-radius: 50%;
        transition: 0.3s;
    }
`;


export default function DarkMode() {

    const [isSwitchActive, setIsSwitchActive] = useState(false);



    return (
        <ButtonWrap>
            <ButtonContainer>
                <SwitchToggleButton active={isSwitchActive} onClick={() => setIsSwitchActive(!isSwitchActive)}>
                    <p>{isSwitchActive ? 'ON' : 'OFF'}</p>
                </SwitchToggleButton>
            </ButtonContainer>
        </ButtonWrap>
    )


}


