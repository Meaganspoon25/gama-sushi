import React, { useState, useEffect } from 'react';
import { useParams,  } from 'react-router-dom';
import UpdateReview from './UpdateReview';
import useToken from '@galvanize-inc/jwtdown-for-react';
import StarRating from './StarRating';
import '../styles/css/reviewlist.css';

const API_HOST = import.meta.env.VITE_API_HOST;

const ReviewDetailWithUpdate = () => {
    const { review_id } = useParams();
    const [review, setReview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { token } = useToken();


    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`${API_HOST}/review/${review_id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch review');
                }
                const reviewData = await response.json();
                setReview(reviewData);
            } catch (error) {
                console.error('Error fetching review:', error);
            }
        };
        fetchReview();
    }, [review_id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    if (!review) {
        return <p>Loading review...</p>;
    }

    return (
        <div className="review-list-container">
            {isEditing ? (
                <UpdateReview review={review} />
            ) : (
                <>
                    <h2 className="review-list-title">Review Details</h2>
                    <p>
                        Review: {review.review}
                        <br />
                        Recommendation: {review.recommendation ? 'Yes' : 'No'}
                        <br />
                        Date Submitted: {review.date_submitted}
                        <br />
                        Rating: <StarRating rating={review.rating} />
                    </p>
                    <button  type="button" className= "btn btn-info" onClick={handleEdit}>Edit Review</button>

                </>
            )}
        </div>
    );
};

export default ReviewDetailWithUpdate;
