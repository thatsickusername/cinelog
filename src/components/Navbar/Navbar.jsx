import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'

function Navbar(){
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();

    function handleSearch(e){
        e.preventDefault();
        console.log(searchValue)
        navigate(`/results?search_query=${encodeURIComponent(searchValue)}`)
    }

    return(
        <div className='navbar'>
            <Link to='/'>
                <h1 className='logo'>CineLog</h1>
            </Link>
            <form onSubmit={handleSearch}> 
                <input  className='searchbar' 
                        placeholder="Search movies, tv shows..." 
                        value={searchValue} 
                        type='text' 
                        onChange={(e)=> setSearchValue(e.target.value)}>
                </input>
            </form>
        </div>
    )
}

export default Navbar