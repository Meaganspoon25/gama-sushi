import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_HOST = import.meta.env.VITE_API_HOST;

const ReviewDetail = () => {
    const { review_id } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`${API_HOST}/reviews/${review_id}`);
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

    if (!review) {
        return <p>Loading review...</p>;
    }

    return (
        <div>
            <h2>Review Details</h2>
            <p>
                Review: {review.review}
                <br />
                Recommendation: {review.recommendation ? 'Yes' : 'No'}
                <br />
                Date Submitted: {review.date_submitted}
                <br />
                Rating: {review.rating}
            </p>
        </div>
    );
};

export default ReviewDetail;
