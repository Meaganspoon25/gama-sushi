import React, { useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { Dropdown } from 'react-bootstrap';
const API_HOST = import.meta.env.VITE_API_HOST
function CreateReview() {
    const [formData, setFormData] = useState({
        review: '',
        recommendation: true,
        date_submitted: new Date().toISOString(),
        rating: '',
    })
    const [successMessage, setSuccessMessage] = useState('')
    const { token } = useToken()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `${API_HOST}/reviews/create`
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            setSuccessMessage('Review added!')
            setFormData({
                review: '',
                recommendation: true,
                date_submitted: new Date().toISOString(),
                rating: '',
            })
        }
    }
    const handleFormChange = (e) => {
        const value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const inputName = e.target.name
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
                {token && (
                    <Dropdown className="mr-2 d-flex justify-content-center">
                        <Dropdown.Toggle
                            variant="black"
                            id="dropdownMenuButton"
                        >
                            Reviews
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href={'/reviews/${user_id}'}>
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
                <div className="shadow p-4 mt-4">
                    <h1>New Review</h1>
                    {successMessage && (
                        <p style={{ color: 'green' }}>{successMessage}</p>
                    )}
                    <form onSubmit={handleSubmit} id="create-review-form">
                        <div className="form-floating mb-3">
                            <textarea
                                onChange={handleFormChange}
                                value={formData.review}
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
                                checked={formData.recommendation}
                                required
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
                                required
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
                                max="5" // Limit the rating to a maximum of 5 stars
                            />
                            <label htmlFor="rating">Rating</label>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreateReview