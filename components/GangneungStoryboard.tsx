'use client';

import React, { useState } from 'react';

const THEMES = {
    light: {
        '--gn-deepblue': '#003366',
        '--gn-accent': '#FFD700',
        '--gn-success': '#22C55E',
        '--gn-bg': '#F1F5F9',
        '--text-main': '#1E293B',
        '--text-sub': '#64748B',
        '--header-bg': 'rgba(255, 255, 255, 0.85)',
        '--card-bg': '#FFFFFF',
    },
    highContrast: {
        '--gn-deepblue': '#000000',
        '--gn-accent': '#FFFF00', // 고대비 핵심 노랑
        '--gn-success': '#FFFF00',
        '--gn-bg': '#000000',
        '--text-main': '#FFFF00',
        '--text-sub': '#FFFFFF',
        '--header-bg': '#000000',
        '--card-bg': '#000000',
    },
};

const GangneungPremiumTour = () => {
    const [isSheetOpen, setSheetOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'highContrast'>('light');

    const currentThemeStyles = THEMES[theme] as React.CSSProperties;
    const isHC = theme === 'highContrast';

    // 💡 고대비 모드일 때 보더를 더 굵고 명확한 노란색으로 설정
    const borderStyle = isHC ? '3px solid #FFFF00' : '1px solid rgba(255, 255, 255, 0.3)';

    return (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                fontFamily: 'Pretendard, -apple-system, sans-serif',
                transition: 'all 0.5s ease-in-out',
                ...currentThemeStyles,
            }}
        >
            {/* 🗺️ 배경 지도: 고대비 시 brightness를 확 낮춰서 글자를 돋보이게 함 */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: "url('/map_placeholder.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: isHC
                        ? 'grayscale(100%) invert(100%) contrast(150%) brightness(0.4)' // 💡 여기서 배경을 어둡게 죽여야 합니다.
                        : isSheetOpen
                        ? 'blur(8px) grayscale(40%)'
                        : 'none',
                    opacity: isHC ? 0.7 : 1,
                    transition: 'all 0.6s ease',
                    zIndex: 0,
                }}
                onClick={() => setSheetOpen(false)}
            />

            {/* 📱 헤더: 버튼 내부 글자색 강제 지정 */}
            <header
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    height: '70px',
                    backgroundColor: 'var(--header-bg)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    zIndex: 100,
                    border: borderStyle,
                    boxSizing: 'border-box',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>🌊</span>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: isHC ? '#FFFF00' : '#003366' }}>
                        G-Barrier Free
                    </h2>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                        onClick={() => setTheme(isHC ? 'light' : 'highContrast')}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '14px',
                            border: isHC ? '2px solid #FFFF00' : '1px solid #ddd',
                            backgroundColor: isHC ? '#000' : 'var(--gn-bg)',
                            color: isHC ? '#FFFF00' : '#003366', // 💡 글자색 명확히
                            fontSize: '13px',
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        {isHC ? '☀️ 일반 모드' : '♿ 고대비 켜기'}
                    </button>

                    <div
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '14px',
                            backgroundColor: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                            border: isHC ? '2px solid #000' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isHC ? '#000' : 'white', // 💡 배경이 노랑이면 글자는 검정
                            fontWeight: 900,
                        }}
                    >
                        JS
                    </div>
                </div>
            </header>

            {/* 🧭 필터: 고대비 시 검정 배경에 노란 글자로 고정 */}
            <div
                className="no-scrollbar"
                style={{
                    position: 'absolute',
                    top: '105px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    gap: '12px',
                    padding: '0 20px',
                    overflowX: 'auto',
                    zIndex: 50,
                    boxSizing: 'border-box',
                }}
            >
                <button
                    style={{
                        flexShrink: 0,
                        padding: '12px 24px',
                        borderRadius: '18px',
                        border: borderStyle,
                        backgroundColor: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                        color: isHC ? '#000' : '#FFFFFF',
                        fontWeight: 901,
                        fontSize: '14px',
                    }}
                >
                    📍 전체
                </button>
                <button
                    style={{
                        flexShrink: 0,
                        padding: '12px 24px',
                        borderRadius: '18px',
                        border: borderStyle,
                        backgroundColor: isHC ? '#000' : '#FFF',
                        color: isHC ? '#FFFF00' : 'var(--text-main)',
                        fontWeight: 800,
                        fontSize: '14px',
                    }}
                >
                    ♿ 경사로
                </button>
            </div>

            {/* 📍 마커: 노란 배경에 검정 글자로 가독성 확보 */}
            <div
                style={{
                    position: 'absolute',
                    top: '48%',
                    left: '52%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 60,
                    opacity: isSheetOpen ? 0 : 1,
                    transition: 'all 0.3s ease',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setSheetOpen(true);
                }}
            >
                <div
                    style={{
                        backgroundColor: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                        color: isHC ? '#000' : '#FFFFFF',
                        border: isHC ? '2px solid #000' : 'none',
                        padding: '12px 22px',
                        borderRadius: '22px',
                        fontSize: '14px',
                        fontWeight: 900,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    안목해변 카페거리
                </div>
                <div
                    style={{
                        width: '6px',
                        height: '14px',
                        backgroundColor: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                        border: isHC ? '2px solid #000' : 'none',
                        borderTop: 'none',
                    }}
                />
            </div>

            {/* 🗂️ 바텀 시트: 고대비 시 블랙 배경에 노란 글자 */}
            <div
                style={{
                    position: 'absolute',
                    left: '16px',
                    right: '16px',
                    bottom: isSheetOpen ? '24px' : '-100%',
                    backgroundColor: isHC ? '#000' : '#FFF',
                    border: borderStyle,
                    borderRadius: '44px',
                    padding: '40px 32px',
                    transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
                    zIndex: 200,
                    boxSizing: 'border-box',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    style={{
                        width: '50px',
                        height: '6px',
                        backgroundColor: isHC ? '#FFFF00' : '#E2E8F0',
                        borderRadius: '10px',
                        margin: '0 auto 32px',
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <span
                            style={{
                                fontSize: '12px',
                                fontWeight: 900,
                                color: isHC ? '#000' : '#22C55E',
                                backgroundColor: isHC ? '#FFFF00' : '#F0FFF4',
                                border: isHC ? '1px solid #000' : 'none',
                                padding: '7px 14px',
                                borderRadius: '12px',
                                display: 'inline-block',
                                marginBottom: '16px',
                            }}
                        >
                            ✓ 무장애 인증 우수 장소
                        </span>
                        <h3
                            style={{
                                margin: 0,
                                fontSize: '32px',
                                fontWeight: 900,
                                color: 'var(--text-main)',
                                letterSpacing: '-1.2px',
                            }}
                        >
                            안목해변 카페거리
                        </h3>
                        <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: 'var(--text-sub)' }}>
                            📍 강원도 강릉시 창해로 14
                        </p>
                    </div>
                    <div
                        style={{
                            textAlign: 'right',
                            backgroundColor: isHC ? '#000' : '#F8FAFC',
                            border: isHC ? '2px solid #FFFF00' : 'none',
                            padding: '18px',
                            borderRadius: '24px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '11px',
                                color: 'var(--text-sub)',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                marginBottom: '4px',
                            }}
                        >
                            Distance
                        </div>
                        <div
                            style={{
                                fontSize: '26px',
                                fontWeight: 900,
                                color: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                            }}
                        >
                            150m
                        </div>
                    </div>
                </div>

                {/* 게이지 바 */}
                <div
                    style={{
                        marginTop: '35px',
                        padding: '24px',
                        backgroundColor: isHC ? '#000' : '#F8FAFC',
                        borderRadius: '28px',
                        border: borderStyle,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>
                            휠체어 접근 편리성
                        </span>
                        <span style={{ fontSize: '15px', fontWeight: 900, color: isHC ? '#FFFF00' : '#22C55E' }}>
                            92% (최상)
                        </span>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            height: '14px',
                            backgroundColor: isHC ? '#333' : '#E2E8F0',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: isHC ? '1px solid #FFFF00' : 'none',
                        }}
                    >
                        <div
                            style={{
                                width: isSheetOpen ? '92%' : '0%',
                                height: '100%',
                                background: isHC ? '#FFFF00' : 'linear-gradient(90deg, #22C55E, #003366)',
                                transition: 'width 1.8s ease-out',
                            }}
                        />
                    </div>
                </div>

                {/* 버튼 그룹 */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '35px' }}>
                    <button
                        style={{
                            flex: 1,
                            height: '68px',
                            borderRadius: '22px',
                            border: borderStyle,
                            backgroundColor: isHC ? '#000' : '#F1F5F9',
                            color: isHC ? '#FFFF00' : '#003366',
                            fontWeight: 900,
                            fontSize: '17px',
                        }}
                    >
                        상세 정보
                    </button>
                    <button
                        style={{
                            flex: 2,
                            height: '68px',
                            borderRadius: '22px',
                            border: borderStyle,
                            backgroundColor: isHC ? '#FFFF00' : '#003366',
                            color: isHC ? '#000' : '#FFF',
                            fontWeight: 900,
                            fontSize: '17px',
                        }}
                    >
                        🚌 비마이카 호출하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GangneungPremiumTour;
