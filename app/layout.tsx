import Navigation from '../components/navigation';
import '../styles/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        template: '%s | Next Movies',
        default: 'Loading...',
    },
    description: 'The best movies on the best frameWork',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navigation />
                {children}
            </body>
        </html>
    );
}