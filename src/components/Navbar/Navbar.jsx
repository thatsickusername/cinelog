import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { useRef, useEffect } from 'react'

function Navbar(){
    const {user, signInWithGoogle, logout} = useAuth()

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref for the dropdown container
    const mobileMenuRef = useRef(null); // Ref for the mobile menu

    function handleGoToProfile(){
        navigate(`/profile/${user?.uid}`)
        toggleMobileMenu()
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

    // Toggle mobile menu
    function toggleMobileMenu() {
        setMobileMenuOpen(prevState => !prevState);
        // When opening mobile menu, ensure body doesn't scroll
        if (!mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Close mobile menu when navigating
    function handleMobileNavigation(path) {
        navigate(path);
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
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

    // Effect to handle escape key for mobile menu
    useEffect(() => {
        function handleEscKey(event) {
            if (event.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
                document.body.style.overflow = 'auto';
            }
        }

        if (mobileMenuOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [mobileMenuOpen]);

    return(
        <>
            <div className='navbar'>
                <Link className="linkStyle" to='/' onClick={() => handleMobileNavigation('/')}>
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

                {/* Mobile menu button (hamburger) */}
                <button 
                    className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`} 
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
                <form onSubmit={(e) => {
                    handleSearch(e);
                    setMobileMenuOpen(false);
                    document.body.style.overflow = 'auto';
                }}> 
                    <input  className='searchbar' 
                            placeholder="Search movies, tv shows..." 
                            value={searchValue} 
                            type='text' 
                            onChange={(e)=> setSearchValue(e.target.value)}>
                    </input>
                </form>
                
                <div className='userLinks'>
                    
                            <div className='userButton' onClick={handleGoToProfile}>
                                {user?.displayName}
                            </div>
                            <div className='userButton' onClick={handleLogout}>
                                Log Out
                            </div>
                        
                    
                </div>
            </div>
        </>
    )
}

export default Navbar
