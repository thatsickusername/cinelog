import { Link } from 'react-router-dom';
import './HorizontalCardsCarousel.css'

function HorizontalCardsCarousel({ cardsDetails, carouselHeader, isLoading }) {
    return (
        <div className="horizontalCardsCarousel">
            <div className="carouselHeader">
                {carouselHeader}
            </div>

            <div className="carouselContainer">
                {isLoading ? (
                    // Skeleton loading cards based on the fixed tiles
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="cardContainer skeletonCard">
                            <div className="cardImage skeleton" />
                            <p className="cardTitle skeleton skeleton-text" />
                            <div className="cardStars skeleton skeleton-text" />
                        </div>
                    ))
                ) : (
                    cardsDetails && cardsDetails.length > 0 ? (
                        cardsDetails.map(Movie => (
                            <Link key={Movie.id} to={`/movie/${Movie.id}`}>
                                <div className="cardContainer">
                                    <img className="cardImage" src={`https://image.tmdb.org/t/p/w300/${Movie.poster_path}`} />
                                    <p className="cardTitle">{Movie.title}</p>
                                    <div className="cardStars">{Movie.vote_average}</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="noDataText">No movies found.</div>
                    )
                )}
            </div>
        </div>
    );
}

export default HorizontalCardsCarousel;