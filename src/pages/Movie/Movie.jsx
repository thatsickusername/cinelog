import { useParams } from "react-router-dom";
import DetailsHeaderContainer from "../../components/DetailsHeaderContainer/DetailsHeaderContainer";
import CastCarousel from "../../components/CastCarousel/CastCarousel";

function Movie() {
    const {type, id} = useParams()

    return (
        <div className="moviesContainer">
            <DetailsHeaderContainer type={type} id={id}/>
            <CastCarousel/>
        </div>
    );
}

export default Movie;