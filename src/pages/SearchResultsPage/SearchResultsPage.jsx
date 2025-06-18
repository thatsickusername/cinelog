import React from 'react';
import useSearchMovies from '../../services/useSearchMovies';
import useSearchTV from '../../services/useSearchTV';
import { useSearchParams } from 'react-router-dom';
import HorizontalCardsCarousel from '../../components/HorizontalCardsCarousel/HorizontalCardsCarousel';
import './SearchResultsPage.css'


function SearchResultsPage(props) {
    const [searchParams] = useSearchParams();
    const search_query = searchParams.get('search_query')

    const {data: SearchResultMovies, isLoading: isSearchResultMoviesLoading} = useSearchMovies(search_query)
    const {data: SearchResultTV, isLoading: isSearchResultTVLoading} = useSearchTV(search_query)

    return (
        <div className='SearchResultsContainer'>
            <HorizontalCardsCarousel
                cardsDetails={SearchResultMovies?.results}
                carouselHeader="Search Results for Movies"
                isLoading={isSearchResultMoviesLoading}
                type="movie"
            />
            {/* <HorizontalCardsCarousel
                cardsDetails={SearchResultTV?.results}
                carouselHeader="Search Results for TV Shows"
                isLoading={isSearchResultTVLoading}
                type="tv"
            /> */}
            <div className="horizontalCardsCarousel">
                <h2 className="carouselHeader">Search Results for TV Shows coming soon</h2>
            </div>

        </div>
        
    );
}

export default SearchResultsPage;