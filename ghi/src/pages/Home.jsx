import React, { useState } from 'react';
import '../styles/css/home.css';
import Misosoup from '../images/Misosoup.png';
import Sushitray from '../images/Sushitray.png';
import Dumplings from '../images/Dumplings.png';
import Friedrice from '../images/Friedrice.png';
import Californiaroll from '../images/Californiaroll.png';
import Zarusoba from '../images/Zarusoba.png';
import restaurant from '../images/restaurant.png';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [Misosoup, Sushitray, Dumplings];
    const smallImages = [Friedrice, Californiaroll, Zarusoba];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
        <div className="home-background">
            <div className="home-container">
                <button className="home-prev" onClick={prevSlide}>
                    <svg className="home-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 18L2 10L10 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Previous
                </button>
                <div className="home-slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="home-slide"
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ))}
                </div>
                <button className="home-next" onClick={nextSlide}>
                    Next
                    <svg className="home-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2L18 10L10 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="small-photos">
                    {smallImages.map((smallImage, index) => (
                        <img key={index} src={smallImage} alt={`Food ${index + 1}`} />
                    ))}
                </div>

                <div className="why-choose-us">
                    <h2>Why Choose Us</h2>
                    <div className="why-choose-us-grid">
                        <div className="why-choose-us-item">
                            <h3>Our History</h3>
                            <p>Description of Our History...</p>
                        </div>
                        <div className="why-choose-us-item">
                            <h3>Our Mission</h3>
                            <p>Description of Our Mission...</p>
                        </div>
                        <div className="why-choose-us-item">
                            <h3>Our Ingredients</h3>
                            <p>Description of Our Ingredients...</p>
                        </div>
                        <div className="why-choose-us-item">
                            <h3>Our Menu</h3>
                            <p>Description of Our Menu...</p>
                        </div>
                    </div>
                </div>

                {/* "Follow us on Instagram" section */}
                <div className="follow-us-instagram">
                    <h2>Follow us on Instagram</h2>
                    <div className="instagram-photos-container">
                        <a href="https://www.instagram.com/gamasushi702/" target="_blank" rel="noopener noreferrer"><img src={restaurant} alt="Instagram 1" /></a>
                        <a href="https://www.instagram.com/gamasushi702/" target="_blank" rel="noopener noreferrer"><img src={restaurant} alt="Instagram 2" /></a>
                        <a href="https://www.instagram.com/gamasushi702/" target="_blank" rel="noopener noreferrer"><img src={restaurant} alt="Instagram 3" /></a>
                        <a href="https://www.instagram.com/gamasushi702/" target="_blank" rel="noopener noreferrer"><img src={restaurant} alt="Instagram 4" /></a>
                    </div>
                </div>

                <div className="location-hours">
                    <h2>Location</h2>
                    <div className="google-maps-container">
                        <iframe
                            title="Google Maps"
                            width="100%"
                            height="200"
                            loading="lazy"
                            allowFullScreen
                            frameBorder="0"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d322253.9445257926!2d-115.27972618023456!3d36.16994120000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1646949041557!5m2!1sen!2sus"
                        ></iframe>
                        <p>Restaurant Address: 123 Main Street, Las Vegas, Nevada, 88901</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
