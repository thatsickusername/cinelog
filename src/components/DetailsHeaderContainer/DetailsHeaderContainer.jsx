
import { useFirestore } from '../../services/firestore'
import './DetailsHeaderContainer.css'


import { useState } from 'react'
import { useEffect } from 'react'


function DetailsHeaderContainer({logoPath, backdropUrl,details,isDetailsLoading,isImagesLoading, user}) {
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const { addToWatchlist, checkIfInWatchList, removeFromWatchlist} = useFirestore()


    useEffect(()=>{
        checkIfInWatchList(user?.uid, details?.id?.toString()).then((data=>{
            setIsInWatchlist(data)
        }))
    },[details, user])

    const handleRemoveFromWatchlist = async ()=>{
        await removeFromWatchlist (user?.uid, details?.id?.toString())
        const isInWatchlistStatus = await checkIfInWatchList(user?.uid, details?.id?.toString())
        setIsInWatchlist(isInWatchlistStatus)
    }

    const handleSaveToWatchlist = async ()=>{
        const data = {
            id: details?.id,
            title: details?.title || details?.name,
            poster_path: details?.poster_path,
            release_date: details?.release_date,
            vote_average: details?.vote_average,
            overview: details?.overview
        }

        await addToWatchlist(user?.uid, details?.id?.toString() , data)
        const isInWatchlistStatus = await checkIfInWatchList(user?.uid, details?.id?.toString())
        setIsInWatchlist(isInWatchlistStatus)
    }

    return (
            <div className="headerContainer" >
                <div className="headerBackdrop" style={{ backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none' }}>
                    {isImagesLoading || isDetailsLoading ? (
                        <div className="headerSkeleton">
                            <div className="skeleton logoSkeleton" />
                            <div className="TitleSubDetails">
                                <div className="skeleton textLine short" />
                                <div className="skeleton textLine short" />
                                <div className="skeleton textLine short" />
                            </div>
                            <div className="HeaderDescription">
                                <div className="skeleton textLine" />
                                <div className="skeleton textLine" />
                                <div className="skeleton textLine short" />
                            </div>
                        </div>
                    ) : (
                        <>
                            {logoPath && (
                                <img src={`https://image.tmdb.org/t/p/w500/${logoPath}`} alt="Logo" className="logoImage" />
                            )}
                            
                            <div className="TitleSubDetails">
                                <p>{details.adult ? "R Rated" : "PG Rated"}</p>
                                <p>{details.release_date}</p>
                                {/* fix ruun time here */}
                                <p>{details.Runtime}</p>
                                <p>{details.original_language}</p>
                            </div>
                            <div className="HeaderTagsContianer">
                                {details.genres?.map(genre=>(
                                    <div key={genre.id} className="HeaderTags">{genre.name}</div>
                                ))}
                            </div>
                            <div className="HeaderDescription">{details.overview}</div>
                            
                            <div className="HeaderButtonsContainer">
                                {isInWatchlist ? (
                                <button
                                    className="HeaderActionButton remove"
                                    onClick={handleRemoveFromWatchlist}
                                >
                                    In Watchlist
                                </button>
                                ) : (
                                <button
                                    className="HeaderActionButton"
                                    onClick={handleSaveToWatchlist}
                                >
                                    Add to Watchlist
                                </button>
                                )}
                            </div>
                        </>
                    )}
                </div>

            </div>
    );
}

export default DetailsHeaderContainer;