import './HomePage.css'
import useNowPlaying from '../../services/useNowPlaying';
import useTrending from '../../services/useTrending';
import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader';
import HorizontalCardsCarousel from '../../components/HorizontalCardsCarousel/HorizontalCardsCarousel';


function HomePage() {
    const { data: NowPlaying, isLoading: isNowPlayingLoading } = useNowPlaying();
    const { data: Trending, isLoading: isTrendingLoading} = useTrending()

    console.log(NowPlaying)
    return (
        <div className='homeContainer'>
            <WelcomeHeader/>
            <HorizontalCardsCarousel 
                cardsDetails={NowPlaying?.results} 
                carouselHeader="Now Playing"
                isLoading = {isNowPlayingLoading}
            />
            <HorizontalCardsCarousel 
                cardsDetails={Trending.results} 
                carouselHeader="Trending"
                isLoading={isTrendingLoading}
            />
        </div>
    );
}

export default HomePage;