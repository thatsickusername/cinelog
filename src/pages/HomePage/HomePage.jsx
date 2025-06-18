import './HomePage.css'
import useNowPlaying from '../../services/useNowPlaying';
import useTopRatedMovies from '../../services/useTopRatedMovies';
import useUpcomingMovies from '../../services/useUpcomingMovies';
import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader';
import HorizontalCardsCarousel from '../../components/HorizontalCardsCarousel/HorizontalCardsCarousel';


function HomePage() {
    const { data: NowPlaying, isLoading: isNowPlayingLoading } = useNowPlaying();
    const { data: TopRated, isLoading: isTopRatedLoading} = useTopRatedMovies()
    const { data: Upcoming, isLoading: isUpcomingLoading} = useUpcomingMovies()


    return (
        <div className='homeContainer'>
            <WelcomeHeader/>
            <HorizontalCardsCarousel 
                cardsDetails={NowPlaying?.results} 
                carouselHeader="Now Playing"
                isLoading = {isNowPlayingLoading}
                type="movie"
            />
            <HorizontalCardsCarousel 
                cardsDetails={TopRated?.results} 
                carouselHeader="Top Rated Movies"
                isLoading = {isTopRatedLoading}
                type="movie"
            />
            <HorizontalCardsCarousel 
                cardsDetails={Upcoming?.results} 
                carouselHeader="Upcoming Movies"
                isLoading = {isUpcomingLoading}
                type="movie"
            />
        </div>
    );
}

export default HomePage;