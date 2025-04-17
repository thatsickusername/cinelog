import { useParams } from "react-router-dom";
import HeaderContainer from "../../components/HeaderContainer/HeaderContainer";

function Movie() {
    const {type, id} = useParams()

    return (
        <div className="moviesContainer">
            <HeaderContainer type={type} id={id}/>
            <div></div>
        </div>
    );
}

export default Movie;