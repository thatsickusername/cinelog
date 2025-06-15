import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../services/firestore';
import "./ProfilePage.css";

function ProfilePage() {

    const [activeTab, setActiveTab] = useState('watchlist');

    const watchlist=[
        { id: 1, title: "Inception", posterUrl: "https://..." },
        { id: 2, title: "The Matrix", posterUrl: "https://..." },
        { id: 1, title: "Inception", posterUrl: "https://..." },
        { id: 2, title: "The Matrix", posterUrl: "https://..." },
        { id: 1, title: "Inception", posterUrl: "https://..." },
        { id: 2, title: "The Matrix", posterUrl: "https://..." },
        { id: 1, title: "Inception", posterUrl: "https://..." },
        { id: 2, title: "The Matrix", posterUrl: "https://..." },
        { id: 1, title: "Inception", posterUrl: "https://..." },
        { id: 2, title: "The Matrix", posterUrl: "https://..." }
      ]
    const reviews=[
        { id: 1, movieTitle: "Inception", comment: "A mind-bending masterpiece." },
        { id: 2, movieTitle: "Interstellar", comment: "Loved the visuals!" }
      ]

    const {uid} = useParams()
    const {getUserProfile} = useFirestore()
    const [profile, setProfile] = useState(null)

    useEffect(()=>{
        (async ()=>{
            try {
                const data = await getUserProfile(uid)
                setProfile(data)
            }
            catch(error){
                console.log(error)
            }
        })()
    },[uid])

    console.log(profile)

    return (
        profile ? (
            <div className="profile-container">
                <div className="profile-header">
                    <img className="profile-avatar" src={profile.photoURL} alt="User Avatar" />
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
                            <img src={movie.posterUrl} alt={movie.title} />
                            <p>{movie.title}</p>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <div className="review-list">
                        {reviews.map((review) => (
                        <div className="review-card" key={review.id}>
                            <h4>{review.movieTitle}</h4>
                            <p>{review.comment}</p>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        ):(
            <div>LOADING</div>
        )
        
    );
}

export default ProfilePage;