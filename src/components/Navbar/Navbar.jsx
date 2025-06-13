import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'
import { useAuth } from '../../context/useAuth'

function Navbar(){
    const {user, signInWithGoogle, logout} = useAuth()

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();

    function handleSearch(e){
        e.preventDefault();
        navigate(`/results?search_query=${encodeURIComponent(searchValue)}`)
    }

    const handleGoogleLogin = async () =>{
        try{
            await signInWithGoogle();
        } catch (error) {
            console.log('error: ', error)
        }
    }

    function handleLogout (){
        logout()
        setDropdownOpen(prevState => !prevState)
    }

    function handleDropdownToggle(){
        setDropdownOpen(prevState => !prevState)
    }

    return(
        <div className='navbar'>
            <Link className="logoLink" to='/'>
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
            <div className='userLinks'>
                {user && (
                    <div className='userButton' onClick={handleDropdownToggle}>
                    {user?.displayName}
                    <span className={`dropdownArrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
                    </div>
                )}

                {dropdownOpen && (
                    <div className='userDropdown'>
                    <div>Your Profile</div>
                    <div onClick={handleLogout}>Log Out</div>
                    </div>
                )}

                {!user && (
                    <div className='userButton' onClick={handleGoogleLogin}>
                    Log In
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar