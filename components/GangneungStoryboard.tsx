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
        '--gn-accent': '#FFFF00', // 고대비 노랑
        '--gn-success': '#FFFF00',
        '--gn-bg': '#000000',
        '--text-main': '#FFFF00',
        '--text-sub': '#FFFFFF',
        '--header-bg': '#000000',
        '--card-bg': '#000000',
    },
};

const MOCK_DATA = [
    { id: 1, name: '안목해변 카페거리', lat: '45%', lng: '52%', category: '경사로', distance: '150m' },
    { id: 2, name: '강릉항 공중화장실', lat: '65%', lng: '58%', category: '화장실', distance: '320m' },
];

const GangneungPremiumTour = () => {
    const [isSheetOpen, setSheetOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(MOCK_DATA[0]);
    const [theme, setTheme] = useState<'light' | 'highContrast'>('highContrast');
    const [activeCategory, setActiveCategory] = useState('경사로');

    const isHC = theme === 'highContrast';
    const currentThemeStyles = THEMES[theme] as React.CSSProperties;

    // 💡 핵심 수정: 고대비 모드(노란 배경)일 때 선택된 글자색을 검정(#000)으로 강제
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

            {/* 2. 🔴 경사로 하이라이트 경로 */}
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
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M 42 20 L 45 30 L 53 50 L 63 70 "
                        stroke={isHC ? '#FFFF00' : '#FF3B30'}
                        strokeWidth="1.2"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                            opacity: 0.9,
                            filter: isHC ? 'drop-shadow(0 0 10px #FFFF00)' : 'drop-shadow(0 0 12px #FF3B30)',
                            strokeDasharray: '4, 2',
                            animation: 'navDash 2s linear infinite',
                        }}
                    />
                    <style>{`
                        @keyframes navDash {
                            from { stroke-dashoffset: 20; }
                            to { stroke-dashoffset: 0; }
                        }
                    `}</style>
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
                            color: selectedTextColor, // 💡 고대비 시 검정색 적용
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
                            // 선택된 버튼은 고대비 시 노란색 배경, 일반 모드 시 딥블루 배경
                            backgroundColor:
                                activeCategory === cat
                                    ? isHC
                                        ? '#FFFF00'
                                        : 'var(--gn-deepblue)'
                                    : isHC
                                    ? '#000'
                                    : '#FFF',
                            // 💡 글자색 핵심: 선택되면 selectedTextColor(블랙/화이트) 적용
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

            {/* 5. 인터랙티브 마커 리스트 */}
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
                            color: selectedTextColor, // 💡 마커 내부 글자도 가시성 확보
                            border: isHC ? '2px solid #000' : 'none',
                            padding: '10px 18px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 900,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {place.name}
                        {activeCategory === '경사로' && place.category === '경사로' && (
                            <span
                                style={{
                                    marginLeft: '8px',
                                    color: isHC ? '#000' : '#FF3B30', // 고대비 시 마커 내 불꽃 아이콘도 검정으로
                                    animation: 'pulse 1s infinite',
                                }}
                            >
                                ●
                            </span>
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

            {/* 6. 바텀 시트 (생략 - 동일) */}
            {/* ... 기존 바텀 시트 코드 유지 ... */}
        </div>
    );
};

export default GangneungPremiumTour;
