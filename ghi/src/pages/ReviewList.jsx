import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StarRating from './StarRating'
import '../styles/css/reviewlist.css'
import { Dropdown } from 'react-bootstrap'
import useToken from '@galvanize-inc/jwtdown-for-react'
const API_HOST = import.meta.env.VITE_API_HOST
const ReviewList = () => {
    const { token } = useToken()
    const params = useParams()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        const fetchReviews = async () => {
            const url = `${API_HOST}/reviews`
            const result = await fetch(url)
            const data = await result.json()
            setReviews(data)
        }
        fetchReviews()
    }, [])
    const handleSignUpClick = () => {
        navigate('/accounts')
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="review-list-title">Reviews</h1>
                </div>
                <div className="col d-flex justify-content-end">
                    {token && (
                        <Dropdown className="mr-2">
                            <Dropdown.Toggle
                                variant="black"
                                id="dropdownMenuButton"
                            >
                                Reviews
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/reviews/user_id">
                                    My Reviews
                                </Dropdown.Item>
                                <Dropdown.Item href="/reviews/create">
                                    Create a New Review
                                </Dropdown.Item>
                                <Dropdown.Item href="/reviews">
                                    Review List
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    {!token && (
                        <button
                            className="btn btn-secondary ml-auto"
                            type="button"
                            onClick={handleSignUpClick}
                        >
                            Sign Up
                        </button>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="review-list-container">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <h3>Review: {review.review}</h3>
                                <p>
                                    Recommendation:{' '}
                                    {review.recommendation ? 'Yes' : 'No'}
                                </p>
                                <p>Date Submitted: {review.date_submitted}</p>
                                <p>
                                    Rating:{' '}
                                    <StarRating rating={review.rating} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReviewList
