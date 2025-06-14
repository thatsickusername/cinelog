
import './DetailsHeaderContainer.css'

function DetailsHeaderContainer({logoPath, backdropUrl,details,isDetailsLoading,isImagesLoading}) {

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
                                <p>{details.Runtime}</p>
                                <p>{details.original_language}</p>
                            </div>
                            <div className="HeaderDescription">{details.overview}</div>
                            <div className="HeaderTagsContianer">
                                {details.genres ? details.genres.map(genre=>{
                                    return <div key={genre.id} className="HeaderTags">{genre.name}</div>
                                }): <></>}
                            </div>
                        </>
                    )}
                </div>

            </div>
    );
}

export default DetailsHeaderContainer;