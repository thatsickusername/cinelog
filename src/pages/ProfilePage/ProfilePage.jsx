import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../services/firestore';
import "./ProfilePage.css";

function ProfilePage() {

    const [activeTab, setActiveTab] = useState('watchlist');
    const [profile, setProfile] = useState(null)
    const [watchlist, setWatchlist] = useState([])
    const reviews=[
        { id: 1, movieTitle: "Inception", comment: "A mind-bending masterpiece." },
        { id: 2, movieTitle: "Interstellar", comment: "Loved the visuals!" }
      ]

    const {uid} = useParams()
    const {getUserProfile, getUserWatchlist} = useFirestore()
    

    useEffect(()=>{
        (async ()=>{
            try {
                const userData = await getUserProfile(uid)
                const watchlistData = await getUserWatchlist(uid)
                setProfile(userData)
                setWatchlist(watchlistData)

            }
            catch(error){
                console.log(error)
            }
        })()
    },[uid])

    console.log(profile?.photoURL ? profile.photoURL: null)

    return (
        profile ? (
            <div className="profile-container">
                <div className="profile-header">
                        <img
                            className="profile-avatar"
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(profile.displayName || 'User')}`}
                            alt="User Avatar" 
                        />
                    <div className="profile-info">
                    <h1>{profile.displayName}</h1>
                    <p>{profile.email}</p>
                    </div>
                </div>
                {/* Header */}

                {/* Tabs */}
                <div className="profile-tabs">
                    <button
                    className={activeTab === 'watchlist' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('watchlist')}
                    >
                    Watchlist
                    </button>
                    <button
                    className={activeTab === 'reviews' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('reviews')}
                    >
                    Reviews
                    </button>
                </div>

                {/* Content */}
                <div className="profile-content">
                    {activeTab === 'watchlist' ? (
                    <div className="poster-grid">
                        {watchlist.map((movie) => (
                        <div className="poster-card" key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.title}</p>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <div className="profile-review-list">
                        {reviews.map((review) => (
                        <div className="profile-review-card" key={review.id}>
                            <h4>{review.movieTitle}</h4>
                            <p>{review.comment}</p>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        ):(
            <div>LOADING...</div>
        )
        
    );
}

export default ProfilePage;