import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
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
    return (
        <>
            <h1>Reviews</h1>
            <div>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <p>
                            Review: {review.review}
                            <br />
                            Recommendation: {review.recommendation ? 'Yes' : 'No'}
                            <br />
                            Date Submitted: {review.date_submitted}
                            <br />
                            Rating: {review.rating}
                            <br />
                            <button onClick={() => handleDelete(review.id)}>Delete</button>
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};
export default MyReviews;
