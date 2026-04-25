'use client';

import React, { useState } from 'react';

/**
 * 🎨 테마 및 디자인 시스템
 */
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
        '--gn-accent': '#FFFF00',
        '--gn-success': '#FFFF00',
        '--gn-bg': '#000000',
        '--text-main': '#FFFF00',
        '--text-sub': '#FFFFFF',
        '--header-bg': '#000000',
        '--card-bg': '#000000',
    },
};

/**
 * 🚌 목업 데이터 (버스 도착 정보 포함)
 */
const MOCK_DATA = [
    {
        id: 1,
        name: '안목해변 카페거리',
        lat: '48%',
        lng: '52%',
        category: '경사로',
        distance: '151m',
        busInfo: { line: '302번', type: '저상버스', arrivalTime: '5분 후', status: '여유' },
    },
    {
        id: 2,
        name: '강릉항 공중화장실',
        lat: '65%',
        lng: '58%',
        category: '화장실',
        distance: '320m',
        busInfo: { line: '202-1번', type: '일반버스', arrivalTime: '12분 후', status: '보통' },
    },
];

const GangneungPremiumTour = () => {
    const [isSheetOpen, setSheetOpen] = useState(true);
    const [selectedPlace, setSelectedPlace] = useState(MOCK_DATA[0]);
    const [theme, setTheme] = useState<'light' | 'highContrast'>('light');
    const [activeCategory, setActiveCategory] = useState('전체');

    const isHC = theme === 'highContrast';
    const currentThemeStyles = THEMES[theme] as React.CSSProperties;

    // 고대비 가독성 패치: 배경이 노란색일 때 글자는 검정(#000)
    const selectedTextColor = isHC ? '#000000' : '#FFFFFF';
    const borderStyle = isHC ? '3px solid #FFFF00' : '1px solid rgba(255, 255, 255, 0.3)';

    // 필터링 로직
    const filteredData =
        activeCategory === '전체' ? MOCK_DATA : MOCK_DATA.filter((item) => item.category === activeCategory);

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
            {/* 1. 배경 지도 레이어 */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: "url('/map_placeholder.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: isHC
                        ? 'grayscale(100%) invert(100%) contrast(150%) brightness(0.4)'
                        : isSheetOpen
                        ? 'blur(8px) grayscale(40%)'
                        : 'none',
                    opacity: isHC ? 0.7 : 1,
                    transition: 'all 0.6s ease',
                    zIndex: 0,
                }}
                onClick={() => setSheetOpen(false)}
            />

            {/* 2. 🔴 내비게이션 경로 (경사로 선택 시) */}
            {activeCategory === '경사로' && (
                <svg
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M 0 650 L 300 580 L 520 480 L 750 430 L 1000 450"
                        stroke={isHC ? '#FFFF00' : '#FF3B30'}
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                            opacity: 0.85,
                            filter: isHC ? 'none' : 'drop-shadow(0 0 15px rgba(255, 59, 48, 0.6))',
                            strokeDasharray: '30, 20',
                            animation: 'navDash 2s linear infinite',
                        }}
                    />
                    <style>{`@keyframes navDash { from { stroke-dashoffset: 50; } to { stroke-dashoffset: 0; } }`}</style>
                </svg>
            )}

            {/* 3. 상단 헤더 */}
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
                    <h2
                        style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: 900,
                            color: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                        }}
                    >
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
                            backgroundColor: isHC ? '#000' : '#FFF',
                            color: isHC ? '#FFFF00' : '#003366',
                            fontSize: '12px',
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        {isHC ? '☀️ 일반' : '♿ 고대비'}
                    </button>
                    <div
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '14px',
                            backgroundColor: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: selectedTextColor,
                            fontWeight: 900,
                        }}
                    >
                        JS
                    </div>
                </div>
            </header>

            {/* 4. 카테고리 필터 바 */}
            <div
                className="no-scrollbar"
                style={{
                    position: 'absolute',
                    top: '105px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    gap: '10px',
                    padding: '0 20px',
                    overflowX: 'auto',
                    zIndex: 50,
                    boxSizing: 'border-box',
                }}
            >
                {['전체', '경사로', '화장실'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            setSheetOpen(false);
                        }}
                        style={{
                            flexShrink: 0,
                            padding: '12px 20px',
                            borderRadius: '18px',
                            border: borderStyle,
                            backgroundColor:
                                activeCategory === cat
                                    ? isHC
                                        ? '#FFFF00'
                                        : 'var(--gn-deepblue)'
                                    : isHC
                                    ? '#000'
                                    : '#FFF',
                            color: activeCategory === cat ? selectedTextColor : isHC ? '#FFFF00' : 'var(--text-main)',
                            fontWeight: 900,
                            fontSize: '14px',
                            transition: '0.3s',
                            cursor: 'pointer',
                        }}
                    >
                        {cat === '전체' ? '📍 전체' : cat === '경사로' ? '♿ 경사로' : '🚻 화장실'}
                    </button>
                ))}
            </div>

            {/* 5. 마커 리스트 */}
            {filteredData.map((place) => (
                <div
                    key={place.id}
                    style={{
                        position: 'absolute',
                        top: place.lat,
                        left: place.lng,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        zIndex: 60,
                        opacity: isSheetOpen ? 0 : 1,
                        transition: 'all 0.4s',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlace(place);
                        setSheetOpen(true);
                    }}
                >
                    <div
                        style={{
                            backgroundColor: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                            color: selectedTextColor,
                            border: isHC ? '2px solid #000' : 'none',
                            padding: '10px 18px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 900,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {place.name}{' '}
                        {activeCategory === '경사로' && place.category === '경사로' && (
                            <span style={{ marginLeft: '8px', color: isHC ? '#000' : '#FF3B30' }}>●</span>
                        )}
                    </div>
                    <div
                        style={{
                            width: '6px',
                            height: '10px',
                            backgroundColor: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                            border: isHC ? '2px solid #FFFF00' : 'none',
                            borderTop: 'none',
                        }}
                    />
                </div>
            ))}

            {/* 6. 바텀 시트 (정보 및 저상버스 정보) */}
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
            >
                <div
                    style={{
                        width: '50px',
                        height: '6px',
                        backgroundColor: isHC ? '#FFFF00' : '#E2E8F0',
                        borderRadius: '10px',
                        margin: '0 auto 30px',
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
                            ✓ 무장애 {selectedPlace.category} 안내 중
                        </span>
                        <h3 style={{ margin: 0, fontSize: '32px', fontWeight: 900, color: 'var(--text-main)' }}>
                            {selectedPlace.name}
                        </h3>
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
                        <div style={{ fontSize: '11px', color: 'var(--text-sub)', fontWeight: 800 }}>Distance</div>
                        <div
                            style={{
                                fontSize: '24px',
                                fontWeight: 900,
                                color: isHC ? '#FFFF00' : 'var(--gn-deepblue)',
                            }}
                        >
                            {selectedPlace.distance}
                        </div>
                    </div>
                </div>

                {/* 🚌 실시간 저상버스 정보 섹션 */}
                <div
                    style={{
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: isHC ? '#000' : '#EBF5FF',
                        borderRadius: '24px',
                        border: isHC ? '3px solid #FFFF00' : '1px solid #BFDBFE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div
                            style={{
                                fontSize: '24px',
                                backgroundColor: isHC ? '#FFFF00' : '#003366',
                                padding: '10px',
                                borderRadius: '12px',
                                color: isHC ? '#000' : '#FFF',
                            }}
                        >
                            🚌
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-sub)' }}>
                                가장 빠른 버스
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-main)' }}>
                                {selectedPlace.busInfo.line}{' '}
                                <span style={{ fontSize: '13px', color: isHC ? '#FFFF00' : '#003366' }}>
                                    [{selectedPlace.busInfo.type}]
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: isHC ? '#FFFF00' : '#FF3B30' }}>
                            {selectedPlace.busInfo.arrivalTime}
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gn-success)' }}>
                            혼잡도: {selectedPlace.busInfo.status}
                        </div>
                    </div>
                </div>

                {/* 게이지 바 */}
                <div
                    style={{
                        marginTop: '25px',
                        padding: '20px',
                        backgroundColor: isHC ? '#000' : '#F8FAFC',
                        borderRadius: '24px',
                        border: borderStyle,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>
                            휠체어 접근 편리성
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: isHC ? '#FFFF00' : '#22C55E' }}>
                            92%
                        </span>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            height: '12px',
                            backgroundColor: isHC ? '#333' : '#E2E8F0',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: borderStyle,
                        }}
                    >
                        <div
                            style={{
                                width: isSheetOpen ? '92%' : '0%',
                                height: '100%',
                                background: isHC ? '#FFFF00' : 'linear-gradient(90deg, #22C55E, #003366)',
                                transition: 'width 1.5s ease-out',
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
                    <button
                        style={{
                            flex: 1,
                            height: '64px',
                            borderRadius: '22px',
                            border: borderStyle,
                            backgroundColor: isHC ? '#000' : '#F1F5F9',
                            color: isHC ? '#FFFF00' : '#003366',
                            fontWeight: 900,
                        }}
                    >
                        상세 정보
                    </button>
                    <button
                        onClick={() => setSheetOpen(false)}
                        style={{
                            flex: 2,
                            height: '64px',
                            borderRadius: '22px',
                            border: borderStyle,
                            backgroundColor: 'var(--gn-deepblue)',
                            color: selectedTextColor,
                            fontWeight: 900,
                        }}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GangneungPremiumTour;
