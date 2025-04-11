import { Link } from 'react-router-dom';
import './HorizontalCardsCarousel.css'

function HorizontalCardsCarousel({cardsDetails, carouselHeader}) {
    return (
        <div>
            <div className="horizontalCardsCarousel">
                <div className="carouselHeader">
                    {carouselHeader}
                </div>
                <div className="carouselContainer">
                {cardsDetails && cardsDetails.map(Movie => (
                    <Link key={Movie.id} to={`/movie/${Movie.id}`}>
                        <div  className="cardContainer">
                            <img className="cardImage" src={`https://image.tmdb.org/t/p/w300/${Movie.poster_path}`}/>
                            <p className="cardTitle">{Movie.title}</p>
                            <div className="cardStars">{Movie.vote_average}</div>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
}

export default HorizontalCardsCarousel;