import { useRef } from 'react';

function CastCarousel({castList, isLoading}) {
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
            <h2 className="carouselHeader">Top Cast</h2>

            <div className="carouselWrapper">
                <button className="scrollButton left" onClick={() => scroll('left')}>&lt;</button>
                <div className="carouselContainer" ref={scrollRef}>
                    {isLoading ? (
                        Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="cardContainer skeletonCard">
                                <div className="cardImage skeleton" />
                                <p className="cardTitle skeleton skeleton-text" />
                            </div>
                        ))
                    ) : (
                        castList && castList.length > 0 ? (
                            castList.slice(0,10).map(cast => (
                                    <div key={cast.cast_id} className="cardContainer">
                                        <div className="cardImageWrapper">
                                            <img
                                                className="cardImage"
                                                src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
                                                alt={cast.name}
                                            />
                                        </div>
                                        <div className="cardGradientOverlay"></div>
                                        <div className="cardContent">
                                            <p className="cardTitle">{cast.name}</p>
                                        </div>
                                    </div>
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

export default CastCarousel;