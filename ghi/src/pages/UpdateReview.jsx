import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { Dropdown } from 'react-bootstrap'

const API_HOST = import.meta.env.VITE_API_HOST

const UpdateReview = () => {
    const navigate = useNavigate()
    const { review_id } = useParams()
    const { token } = useToken()
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    const [formData, setFormData] = useState({
        review: '',
        recommendation: true,
        date_submitted: formattedDate,
        rating: '',
    })
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`${API_HOST}/review/${review_id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch review')
                }
                const data = await response.json()
                setFormData({
                    review: data.review,
                    recommendation: data.recommendation,
                    date_submitted: data.date_submitted,
                    rating: data.rating,
                })
            } catch (error) {
                console.error('Error fetching review:', error)
                alert('Failed to fetch review. Please try again.')
            }
        }
        fetchReview()
    }, [review_id])

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_HOST}/review/${review_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })
            if (!response.ok) {
                throw new Error('Failed to update review')
            } else {
                setSuccessMessage('Review updated!')
                setFormData({
                    review: '',
                    recommendation: true,
                    date_submitted: formattedDate,
                    rating: '',
                })
            }
        } catch (error) {
            console.error('Error updating review:', error)
            alert('Failed to update review. Please try again.')
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Update Review</h1>
                    {successMessage && (
                        <p style={{ color: 'green' }}>{successMessage}</p>
                    )}
                    <form onSubmit={handleSubmit} id="update-review-form">
                        <div className="form-floating mb-3">
                            <textarea
                                onChange={handleFormChange}
                                defaultValue={formData.review} // Use defaultValue to display existing review
                                placeholder="Review"
                                required
                                name="review"
                                id="review"
                                className="form-control"
                            />
                            <label htmlFor="review">Review</label>
                        </div>
                        <div className="form-check mb-3">
                            <input
                                onChange={handleFormChange}
                                defaultChecked={formData.recommendation} // Use defaultChecked for initial value
                                type="checkbox"
                                name="recommendation"
                                id="recommendation"
                                className="form-check-input"
                            />
                            <label
                                htmlFor="recommendation"
                                className="form-check-label"
                            >
                                Recommendation
                            </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.date_submitted}
                                placeholder="Date Submitted"
                                disabled
                                type="date"
                                name="date_submitted"
                                id="date_submitted"
                                className="form-control"
                            />
                            <label htmlFor="date_submitted">
                                Date Submitted
                            </label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.rating}
                                placeholder="Rating"
                                required
                                type="number"
                                name="rating"
                                id="rating"
                                className="form-control"
                                min="1"
                                max="5"
                            />
                            <label htmlFor="rating">Rating</label>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Update Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateReview
