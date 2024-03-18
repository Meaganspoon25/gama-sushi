import React, { useState } from 'react'
import '../../styles/css/footer.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import instagram from '../../images/instagram-logo.png'
const API_HOST = import.meta.env.VITE_API_HOST

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = async () => {
        try {
            const response = await fetch(`${API_HOST}/newsletter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            if (response.ok) {
                // Handle success
                console.log('Subscribed successfully!')
                setSubscribed(true)
            } else {
                // Handle error
                console.error('Failed to subscribe:', response.statusText)
            }
        } catch (error) {
            console.error('Failed to subscribe:', error)
        }
    }

    return (
        <div className="footer">
            <footer className="py-5">
                <div className="row">
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="Logo" className="logo mr-2" />
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                        <Link to="/contact-us" className="button-link">
                            <h5>Contact Us</h5>
                        </Link>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                        <Link to="/hours" className="button-link">
                            <h5>Hours</h5>
                        </Link>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                        <Link to="/reviews" className="button-link">
                            <h5>Reviews</h5>
                        </Link>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                        <Link to="/career" className="button-link">
                            <h5>Career</h5>
                        </Link>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                        <h5>Subscribe to our newsletter</h5>
                        <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSubscribe}
                                disabled={subscribed}
                            >
                                {subscribed ? 'Subscribed!' : 'Subscribe'}
                            </button>
                        </div>
                        {subscribed && (
                            <p className="text-success mt-2">
                                Thank you for subscribing!
                            </p>
                        )}
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-center py-4 my-4 border-top">
                    <div className="mt-2">
                        <a href="https://www.instagram.com/gamasushi702/">
                            <img
                                src={instagram}
                                alt="Instagram"
                                className="instagram-logo"
                            />
                        </a>
                    </div>
                    <p>© 2024 Gama Sushi, Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
