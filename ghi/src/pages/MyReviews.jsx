
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import '../styles/css/reviewlist.css';
import StarRating from './StarRating';

const API_HOST = import.meta.env.VITE_API_HOST;

const MyReviews = () => {
    const { user_id } = useParams();
    const [reviews, setReviews] = useState([]);
    const { token } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                if (!token) {
                    return;
                }

                const reviewsResponse = await fetch(`${API_HOST}/reviews/${user_id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!reviewsResponse.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const reviewsData = await reviewsResponse.json();
                console.log('Reviews data:', reviewsData);
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchUserReviews();
    }, [user_id, token]);

    const handleDelete = async (reviewId) => {
        try {
            const response = await fetch(`${API_HOST}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete review');
            }

            setReviews(reviews.filter(review => review.id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleUpdate = (reviewId) => {

        navigate(`/review/${reviewId}`);
    };

    return (
        <>
            <h1 className="review-list-title">My Reviews</h1>
            <div className="review-list-container">
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <h3>Review: {review.review}</h3>
                        <p>Recommendation: {review.recommendation ? 'Yes' : 'No'}</p>
                        <p>Date Submitted: {review.date_submitted}</p>
                        <p>Rating: <StarRating rating={review.rating} /></p>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(review.id)}>Delete</button>
                        <button type="button" className="btn btn-info" onClick={() => handleUpdate(review.id)}>Update</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MyReviews;
