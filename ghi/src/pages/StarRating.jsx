import React from 'react';

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<span key={i} className="star-filled">★</span>);
        } else {
            stars.push(<span key={i} className="star">☆</span>);
        }
    }
    return <span>{stars}</span>;
};

export default StarRating;
