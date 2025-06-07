import useDetails from "../../services/useDetails";
import useImages from "../../services/useImages";
import './HeaderContainer.css'

function HeaderContainer({type, id}) {
    const {data : Details, isLoading: isDetailsLoading} = useDetails(type, id) 
    const {data: Images, isLoading: isImagesLoading} = useImages(type,id)
    console.log(Images)

    const englishLogo = Images.logos?.find(logo => logo.iso_639_1 == "en")
    const logoPath = englishLogo ? englishLogo.file_path : Images.logos?.[0]?.file_path

    ///change image logo logic to iso_639_1: en if not then logo[0]

    const backdropUrl = Images.backdrops
        ? `https://image.tmdb.org/t/p/original${Images.backdrops[0].file_path}` 
        : ""

    return (
            <div className="headerContainer" >
                <div className="headerBackdrop" 
                    style={{backgroundImage: `url(${backdropUrl})`                            
                    }}>
                    <img src={`https://image.tmdb.org/t/p/w500/${logoPath}`} alt="Logo"/>
                    {/* <img src={`https://image.tmdb.org/t/p/w500/${Images.logos? Images.logos[0]?.file_path: ""}`}/> */}
                    <div className="TitleSubDetails">
                        <p>{Details.adult ? "R Rated": "PG Rated"}</p>
                        <p>{Details.release_date}</p>
                        <p>{Details.Runtime}</p>
                        <p>{Details.spoken_languages? Details.spoken_languages[0].english_name : ""}</p>
                    </div>
                    <div className="HeaderDescription">
                        {Details.overview}
                    </div>
                    <div className="HeaderTags">thriller</div>
                </div>
            </div>
    );
}

export default HeaderContainer;