import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './HorizontalCardsCarousel.css';

function HorizontalCardsCarousel({ cardsDetails, carouselHeader, isLoading, type }) {
    const scrollRef = useRef();

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 300; // adjust this for scroll intensity

        if (container) {
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="horizontalCardsCarousel">
            <h2 className="carouselHeader">{carouselHeader}</h2>

            <div className="carouselWrapper">
                <button className="scrollButton left" onClick={() => scroll('left')}>&lt;</button>
                <div className="carouselContainer" ref={scrollRef}>
                    {isLoading ? (
                        Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="cardContainer skeletonCard">
                                <div className="cardImage skeleton" />
                                <p className="cardTitle skeleton skeleton-text" />
                                <div className="cardStars skeleton skeleton-text" />
                            </div>
                        ))
                    ) : (
                        cardsDetails && cardsDetails.length > 0 ? (
                            cardsDetails.map(Card => (
                                <Link key={Card.id} to={`/${type}/${Card.id}`} className="cardLink">
                                    <div className="cardContainer">
                                        <div className="cardImageWrapper">
                                            <img
                                                className="cardImage"
                                                src={`https://image.tmdb.org/t/p/w300/${Card.poster_path}`}
                                                alt={Card.title}
                                            />
                                        </div>
                                        <div className="cardGradientOverlay"></div>
                                        <div className="cardContent">
                                            <p className="cardTitle">{Card.title}</p>
                                            <div className="cardStars">⭐ {Card.vote_average?.toFixed(1)}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="noDataText">No movies found.</div>
                        )
                    )}
                </div>
                <button className="scrollButton right" onClick={() => scroll('right')}>&gt;</button>
            </div>
        </div>
    );
}

export default HorizontalCardsCarousel;
