import Banner from "../_components/Banner";
import MovieCarousel from "../_components/MovieCarousel";
import Showtimes from "../_components/Showtimes";
export default function HomePage() {
    return (
        <div
            style={{
                backgroundImage: 'url(/images/HomePageBackground.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh'
            }}
        >
            <div className="bg-black/40">
                <Banner />
                <MovieCarousel />
                <Showtimes />
            </div>
        </div>
    );
}