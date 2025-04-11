import Navbar from "../Navbar/Navbar";
import PropTypes from "prop-types"

function Layout({children}){
    return(
        <>
            <Navbar/>
            <main>
                {children}
            </main>
        </>
    )
}

Layout.Prop ={
    children: PropTypes.node.isRequired,
}

export default Layout