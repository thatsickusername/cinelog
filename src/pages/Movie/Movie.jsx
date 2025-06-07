import { useParams } from "react-router-dom";
import DetailsHeaderContainer from "../../components/DetailsHeaderContainer/DetailsHeaderContainer";

function Movie() {
    const {type, id} = useParams()

    return (
        <div className="moviesContainer">
            <DetailsHeaderContainer type={type} id={id}/>
            <div></div>
        </div>
    );
}

export default Movie;