'use client';

import React, { useState, CSSProperties } from 'react';

const GangneungStoryboard = () => {
    const [isSheetOpen, setSheetOpen] = useState(false);

    // CSSProperties 타입을 명시하여 TS 에러를 방지하고 객체를 분리해 가독성을 높입니다.
    const styles: { [key: string]: CSSProperties } = {
        container: {
            position: 'relative',
            width: '100vw', // % 대신 vw를 사용해 가로 씹힘 방지
            height: '100vh', // 850px 대신 vh를 사용해 전체 화면 대응
            backgroundColor: '#E5E9F0',
            overflow: 'hidden',
            fontFamily: '"Pretendard Variable", Pretendard, -apple-system, sans-serif',
        },
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '70px',
            background: 'linear-gradient(90deg, #003366 0%, #00509d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 100,
            boxSizing: 'border-box', // 패딩이 너비를 넘지 않게 고정
        },
        filterContainer: {
            position: 'absolute',
            top: '90px',
            left: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 50,
        },
        chip: {
            padding: '12px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 51, 102, 0.2)',
            borderRadius: '16px',
            fontWeight: '700',
            color: '#003366',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
            cursor: 'pointer',
        },
        marker: {
            position: 'absolute',
            top: '45%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
        },
        markerTag: {
            backgroundColor: '#003366',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '800',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            marginBottom: '4px',
        },
        bottomSheet: {
            position: 'absolute',
            bottom: isSheetOpen ? '20px' : '-120%', // 밖으로 완전히 숨기기 위해 조정
            left: '20px',
            right: '20px',
            backgroundColor: 'white',
            borderRadius: '32px',
            padding: '32px 24px',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
            transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            zIndex: 200,
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            margin: '24px 0',
        },
        infoCard: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            borderRadius: '20px',
            background: '#F8FAFC',
            border: '1px solid #EDF2F7',
        },
        ctaButton: {
            width: '100%',
            padding: '18px',
            background: '#003366',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontSize: '17px',
            fontWeight: '800',
            boxShadow: '0 10px 20px rgba(0,51,102,0.2)',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            {/* 지도 배경 */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/128.91,37.79,13,0/1000x1000?access_token=YOUR_MAPBOX_TOKEN')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.8,
                }}
                onClick={() => setSheetOpen(false)}
            />

            {/* 헤더 */}
            <header style={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '25px' }}>🌊</div>
                    <h2 style={{ fontSize: '19px', fontWeight: '900', letterSpacing: '-0.5px', margin: 0 }}>
                        G-Barrier Free
                    </h2>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        🔍
                    </div>
                    <div
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#FFD700',
                            color: '#003366',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        My
                    </div>
                </div>
            </header>

            {/* 필터 칩 */}
            <div style={styles.filterContainer}>
                <div style={styles.chip}>
                    <span>♿</span> 경사로 완만
                </div>
                <div style={{ ...styles.chip, backgroundColor: '#003366', color: 'white' }}>
                    <span>🚻</span> 장애인 화장실
                </div>
                <div style={styles.chip}>
                    <span>🅿️</span> 전용 주차장
                </div>
            </div>

            {/* 마커 핀 */}
            <div
                style={styles.marker}
                onClick={(e) => {
                    e.stopPropagation();
                    setSheetOpen(true);
                }}
            >
                <div style={styles.markerTag}>안목해변 카페거리</div>
                <div
                    style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#003366',
                        borderRadius: '50%',
                        border: '3px solid white',
                        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    }}
                />
            </div>

            {/* 프리미엄 바텀 시트 */}
            <div style={styles.bottomSheet} onClick={(e) => e.stopPropagation()}>
                <div
                    style={{
                        width: '40px',
                        height: '4px',
                        backgroundColor: '#E2E8F0',
                        margin: '0 auto 24px',
                        borderRadius: '2px',
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <span
                            style={{
                                backgroundColor: '#EBF8FF',
                                color: '#2B6CB0',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                        >
                            관광지 · 강릉시
                        </span>
                        <h3 style={{ margin: '8px 0 4px 0', fontSize: '26px', fontWeight: '900', color: '#1A202C' }}>
                            안목해변 카페거리
                        </h3>
                        <p style={{ color: '#718096', margin: 0, fontSize: '14px' }}>📍 강원도 강릉시 창해로 14</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#003366', fontWeight: '900', fontSize: '18px' }}>150m</div>
                        <div style={{ fontSize: '12px', color: '#A0AEC0' }}>장애인 주차장</div>
                    </div>
                </div>

                <div style={styles.infoGrid}>
                    <div style={styles.infoCard}>
                        <span style={{ fontSize: '28px' }}>🛤️</span>
                        <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '8px', color: '#4A5568' }}>
                            단차 없음
                        </span>
                    </div>
                    <div style={{ ...styles.infoCard, border: '2px solid #22C55E', background: '#F0FFF4' }}>
                        <span style={{ fontSize: '28px' }}>🚻</span>
                        <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '8px', color: '#276749' }}>
                            장애인 화장실
                        </span>
                    </div>
                    <div style={styles.infoCard}>
                        <span style={{ fontSize: '28px' }}>🛗</span>
                        <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '8px', color: '#4A5568' }}>
                            엘리베이터
                        </span>
                    </div>
                </div>

                <button style={styles.ctaButton} onClick={() => alert('이동지원센터로 연결합니다.')}>
                    🚌 저상버스 및 이동지원센터 호출
                </button>
            </div>
        </div>
    );
};

export default GangneungStoryboard;
