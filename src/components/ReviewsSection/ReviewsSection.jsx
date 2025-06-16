import { useEffect, useState } from "react";
import { useFirestore } from "../../services/firestore";

import "./ReviewsSection.css"

function ReviewsSection({movieId, user}) {

    const [heading, setHeading] = useState("")
    const [description,setDescription] = useState("")
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [enableReviewSubmit, setEnableReviewSubmit] = useState(false)
    const [movieReviews, setMovieReviews] = useState([])

    const {checkIfAlreadyReviewed, addReviewToMovie, getMovieReviews} = useFirestore()

    useEffect(()=>{
        checkIfAlreadyReviewed(movieId, user?.uid).then((data=>{
            setEnableReviewSubmit(data)
        }))
    },[movieId, user])

    useEffect(()=>{
        (async ()=>{
            try{
                const reviewData = await getMovieReviews(movieId)
                setMovieReviews(reviewData)
            }
            catch(error){
                console.log(error)
            }
        })()
    },[movieId])

    const handleReviewSubmit = async () =>{
        const data = {
            review_title: heading,
            review_description: description,
            review_rating: rating,
            review_by: user?.displayName
        }

        console.log(data)
        await addReviewToMovie(movieId, user?.uid, data )
        const isAlreadyReviewed = await checkIfAlreadyReviewed(movieId, user?.uid)
        setEnableReviewSubmit(!isAlreadyReviewed)
    }

    const renderStars = (rating) => {
        const fullStars = '★'.repeat(Math.floor(rating));
        const emptyStars = '☆'.repeat(5 - Math.floor(rating));
        return fullStars + emptyStars;
      };

    return (
        <div className="review-section">
            <h2 className="section-title">User Reviews</h2>

            <div className="reviews-list">
                {movieReviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first to write one!</p>
                ) : (
                movieReviews.map((review) => (
                    <div className="review-card" key={review.id}>
                    <div className="review-header">
                        <div className="review-title">
                        <h3>{review.review_title}</h3>
                        <p className="review-user">by {review.review_by}</p>
                        </div>
                        <div className="review-rating">
                            {renderStars(review.review_rating)}
                        </div>
                    </div>
                    <p className="review-description">{review.review_description}</p>
                    </div>
                ))
                )}
            </div>

            <div  className="review-form">
                <input
                    type="text"
                    placeholder="Review Title"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                />
                <textarea
                    placeholder="Write your full review..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span
                        key={num}
                        className={`star ${rating >= num ? 'filled' : ''}`}
                        onClick={() => setRating(num)}
                        onMouseEnter={() => setHover(num)}
                        onMouseLeave={() => setHover(0)}
                        >
                        {hover >= num || rating >= num ? '★' : '☆'}
                        </span>
                    ))}
                </div>
                <button className="submit-button" onClick={handleReviewSubmit}>Submit Review</button>
            </div>
        </div>

    );
}

export default ReviewsSection;