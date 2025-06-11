import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";


function Protected({children}) {
    const {user, isLoading} = useAuth()
    if(isLoading){
        return null; //add loading spinner here
    }
    return (
        <>
            {user ? children : <Navigate to="/login"/>}
        </>
    );
}

export default Protected;

Protected.propTypes = {
    children: PropTypes.node.isRequired,
}