import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_HOST = import.meta.env.VITE_API_HOST;

const ReviewList = () => {
    const params = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const url = `${API_HOST}/reviews`;
            const result = await fetch(url);
            const data = await result.json();
            setReviews(data);
        };
        fetchReviews();
    }, []);

    return (
        <>
            <h1>Reviews</h1>
            <div>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <p>
                            Review: {review.review}<br />
                            Recommendation: {review.recommendation ? 'Yes' : 'No'}<br />
                            Date Submitted: {review.date_submitted}<br />
                            Rating: {review.rating}<br />
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ReviewList;
