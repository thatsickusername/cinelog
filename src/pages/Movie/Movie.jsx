import { useParams } from "react-router-dom";
import HeaderContainer from "../../components/HeaderContainer/HeaderContainer";

function Movie() {
    const {type, id} = useParams()

    return (
        <div>
            <HeaderContainer type={type} id={id}/>
        </div>
    );
}

export default Movie;