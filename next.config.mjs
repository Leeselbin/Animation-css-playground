/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/', // 사용자가 루트(/)로 들어오면
                destination: '/figmaPractice', // 여기로 보낸다
                permanent: true, // 301 리다이렉트 (SEO에 유리)
            },
        ];
    },
};

export default nextConfig;
