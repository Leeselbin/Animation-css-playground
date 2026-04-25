import type { Config } from 'tailwindcss';

const config: Config = {
    // 1. Tailwind를 적용할 파일 경로 설정
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            // 2. 강릉 프로젝트 전용 테마 컬러 등록
            colors: {
                gn: {
                    deepblue: '#003366', // 강릉 딥 블루
                    accent: '#FFD700', // 고대비 노랑
                    success: '#22C55E',
                    bg: '#F8FAFC',
                },
            },
            // 3. 애니메이션 효과 (바텀 시트 등)
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
            },
        },
    },
    plugins: [],
};
export default config;
