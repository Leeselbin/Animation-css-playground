'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/navigation.module.css';

export default function Navigation() {
    const path = usePathname();

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li>
                    <Link href={'/button'}>Button{path === '/button' ? '🔥' : ''}</Link>
                </li>
                <li>
                    <Link href={'/carousel'}>Carousel{path === '/carousel' ? '🔥' : ''}</Link>
                </li>
                <li>
                    <Link href={'/calendar'}>Calendar{path === '/calendar' ? '🔥' : ''}</Link>
                </li>
            </ul>
        </nav>
    );
}
