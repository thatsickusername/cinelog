import { useParams } from "react-router-dom";
import DetailsHeaderContainer from "../../components/DetailsHeaderContainer/DetailsHeaderContainer";
import CastCarousel from "../../components/CastCarousel/CastCarousel";
import useDetails from "../../services/useDetails";
import useImages from "../../services/useImages";
import useCredits from "../../services/useCredits";
import ExtraDetails from "../../components/ExtraDetails/ExtraDetails"
import "./Movie.css"

function Movie() {
    const {type, id} = useParams()

    //fetching of all data
    const {data : details, isLoading: isDetailsLoading} = useDetails(type, id) 
    const {data: images, isLoading: isImagesLoading} = useImages(type,id)
    const {data: credits, isLoading: isCreditsLoading} = useCredits(id)
    console.log(details)

    //calcuation over data
    const englishLogo = images.logos?.find(logo => logo.iso_639_1 == "en")
    const logoPath = englishLogo?.file_path || images.logos?.[0]?.file_path || "";

    ///change image logo logic to iso_639_1: en if not then logo[0]

    const backdropUrl = images.backdrops?.[0]
        ? `https://image.tmdb.org/t/p/original${images.backdrops[0]?.file_path}` 
        : ""

    return (
        <div className="moviesContainer">
            <DetailsHeaderContainer 
                logoPath={logoPath} 
                backdropUrl={backdropUrl} 
                details={details} 
                isDetailsLoading={isDetailsLoading}
                isImagesLoading={isImagesLoading}
            />
            <div className="sideBySide">
                <div className="main-content">
                    <CastCarousel
                        castList={credits.cast}
                        isLoading={isCreditsLoading}
                    />
                </div>
                <div className="side-content">
                    <ExtraDetails 
                        details={details}
                        isLoading={isDetailsLoading}
                    />
                </div>
                
            </div>
        </div>
    );
}

export default Movie;