import CursorCarousel from '../../components/carousel/CursorCarousel';
import NormalCarousel from '../../components/carousel/NormalCarousel';
import SlidingCarousel from '../../components/carousel/SlidingCarousel';

export default function carousel() {
    return (
        <div>
            <NormalCarousel />
            <SlidingCarousel />
            <CursorCarousel />
        </div>
    );
}
