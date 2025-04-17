import './HomePage.css'
import useNowPlaying from '../../services/useNowPlaying';
import useTrending from '../../services/useTrending';
import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader';
import HorizontalCardsCarousel from '../../components/HorizontalCardsCarousel/HorizontalCardsCarousel';


function HomePage() {
    const NowPlaying = useNowPlaying()
    const Trending = useTrending()

    console.log(NowPlaying)
    return (
        <div className='homeContainer'>
            <WelcomeHeader/>
            <HorizontalCardsCarousel cardsDetails={NowPlaying.results} carouselHeader="Now Playing"/>
            <HorizontalCardsCarousel cardsDetails={Trending.results} carouselHeader="Trending"/>
        </div>
    );
}

export default HomePage;