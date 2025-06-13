import useDetails from "../../services/useDetails";
import useImages from "../../services/useImages";
import './DetailsHeaderContainer.css'

function DetailsHeaderContainer({type, id}) {
    const {data : Details, isLoading: isDetailsLoading} = useDetails(type, id) 
    const {data: Images, isLoading: isImagesLoading} = useImages(type,id)


    const englishLogo = Images.logos?.find(logo => logo.iso_639_1 == "en")
    const logoPath = englishLogo?.file_path || Images.logos?.[0]?.file_path || "";

    ///change image logo logic to iso_639_1: en if not then logo[0]

    const backdropUrl = Images.backdrops?.[0]
        ? `https://image.tmdb.org/t/p/original${Images.backdrops[0]?.file_path}` 
        : ""

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
                                <p>{Details.adult ? "R Rated" : "PG Rated"}</p>
                                <p>{Details.release_date}</p>
                                <p>{Details.Runtime}</p>
                                <p>{Details.original_language}</p>
                            </div>
                            <div className="HeaderDescription">{Details.overview}</div>
                            <div className="HeaderTagsContianer">
                                {Details.genres ? Details.genres.map(genre=>{
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