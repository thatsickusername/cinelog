import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFirestore } from '../../services/firestore';
import "./ProfilePage.css";
import { formatDistanceToNow } from 'date-fns';

function ProfilePage() {

    const [activeTab, setActiveTab] = useState('watchlist');
    const [profile, setProfile] = useState(null)
    const [watchlist, setWatchlist] = useState([])
    const [reviewList, setReviewList] = useState([])

    const {uid} = useParams()
    const {getUserProfile, getUserWatchlist, getUserReviews} = useFirestore()
    

    useEffect(()=>{
        (async ()=>{
            try {
                const userData = await getUserProfile(uid)
                const watchlistData = await getUserWatchlist(uid)
                const reviewData = await getUserReviews(uid)
                setProfile(userData)
                setWatchlist(watchlistData)
                setReviewList(reviewData)
            }
            catch(error){
                console.log(error)
            }
        })()
    },[uid])

    const renderStars = (rating) => {
        const fullStars = '★'.repeat(Math.floor(rating));
        const emptyStars = '☆'.repeat(5 - Math.floor(rating));
        return fullStars + emptyStars;
      };

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
                        <Link className="linkStyle" to={`/movies/${movie.id}`}>
                            <div className="poster-card" key={movie.id}>
                                <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
                                <p>{movie.title}</p>
                            </div>
                        </Link>
                        
                        ))}
                    </div>
                    ) : (
                    <div className="profile-review-list">
                        {reviewList.map((review) => (
                                <div className="profile-review-card" key={review.id}>
                                    <Link className="linkStyle" key={review.movieId} to={`/movie/${review.movieId}`}>
                                        <div className="cardContainer">
                                            <div className="cardImageWrapper">
                                                <img className="cardImage" src={`https://image.tmdb.org/t/p/w300/${review.poster_path}`} alt={review.movie_title} />
                                            </div>
                                            <div className="cardGradientOverlay"></div>
                                            <div className="cardContent">
                                                <h4 className="cardTitle">{review.movie_title}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                
                                    <div className="profile-review-content">
                                    <div className="review-header">
                                        <div className="review-title">
                                        <h3>{review.review_title}</h3>
                                        <p className="review-user">by {review.review_by}
                                            <span className="review-time"> • {formatDistanceToNow(review.createdAt.seconds * 1000, {addSuffix: true})} </span>
                                        </p>
                                        </div>
                                        <div className="review-rating">
                                        {renderStars(review.review_rating)}
                                        </div>
                                    </div>
                                    <p className="review-description">{review.review_description}</p>
                                    </div>
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