import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { useRef, useEffect } from 'react'

function Navbar(){
    const {user, signInWithGoogle, logout} = useAuth()

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref for the dropdown container

    function handleGoToProfile(){
        navigate(`/profile/${user?.uid}`)
        setDropdownOpen(false); // Close dropdown after navigation
    }

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
        setDropdownOpen(false) // Close dropdown after logout
    }

    function handleDropdownToggle(){
        setDropdownOpen(prevState => !prevState)
    }

    // Effect to handle clicks outside the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return(
        <div className='navbar'>
            <Link className="linkStyle" to='/'>
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
            <div className='userLinks' ref={dropdownRef}> {/* Attach ref here */}
                {user && (
                    <div className='userButton' onClick={handleDropdownToggle}>
                    {user?.displayName}
                    <span className={`dropdownArrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
                    </div>
                )}

                {dropdownOpen && (
                    <div className='userDropdown'>
                    <div onClick={handleGoToProfile}>Your Profile</div>
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
