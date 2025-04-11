import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar(){
    return(
        <div className='navbar'>
            <Link to='/'>
                <h1 className='logo'>CineLog</h1>
            </Link>
            <input className='searchbar' type='text'></input>
        </div>
    )
}

export default Navbar