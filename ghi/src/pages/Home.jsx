import React, { useState, useEffect } from 'react'
import '../styles/css/home.css'
import Zarusoba from '../images/Zarusoba.png'
import Ramenudon from '../images/Ramenudon.png'
import Friedrice from '../images/Friedrice.png'
import sushi2 from '../images/sushi2.jpg'
import sushitray from '../images/sushitray.jpg'
import salmon from '../images/salmon.jpg'
import chef from '../images/chef.jpg'
import crabrangoon from '../images/crabrangoon.jpg'
import ramensoup from '../images/ramensoup.jpg'
import chickenkarrage from '../images/chickenkaraage.jpg'
import spicytuna from '../images/spicytuna.jpg'

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const images = [sushi2, sushitray, salmon, chef]
    const smallImages = [Zarusoba, Ramenudon, Friedrice]
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === images.length - 1 ? 0 : prevSlide + 1
            )
        }, 2000)
        return () => clearInterval(interval)
    }, [currentSlide])
    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === images.length - 1 ? 0 : prevSlide + 1
        )
    }
    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? images.length - 1 : prevSlide - 1
        )
    };

    return (
        <div className="home-background">
            <div className="home-container">
                <button className="home-prev" onClick={prevSlide}>
                    <svg
                        className="home-arrow"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 18L2 10L10 2"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Previous
                </button>
                <div
                    className="home-slider"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
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
                    <svg
                        className="home-arrow"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 2L18 10L10 18"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div className="small-photos">
                    {smallImages.map((smallImage, index) => (
                        <img
                            key={index}
                            src={smallImage}
                            alt={`Food ${index + 1}`}
                        />
                    ))}
                </div>
                <div className="why-choose-us">
                    <h2>Why Choose Us?</h2>
                    <div className="why-choose-us-grid">
                        <div className="why-choose-us-item">
                            <h3>Our History</h3>
                            <p>
                                Gama Sushi," located in downtown Las Vegas, was
                                founded in 2005 by master sushi chef Kenji
                                Yamamoto, a Tokyo native with a passion for
                                crafting authentic Japanese cuisine. Renowned
                                for its exquisite sushi creations and
                                exceptional dining experience, Gama Sushi
                                quickly became a favorite among locals and
                                tourists alike.
                            </p>
                        </div>
                        <div className="why-choose-us-item">
                            <h3>Our Mission</h3>
                            <p>
                                At Gama Sushi, our mission is to delight our
                                guests with an unforgettable culinary
                                experience, showcasing the artistry and
                                tradition of Japanese cuisine. We are committed
                                to using only the freshest and highest quality
                                ingredients, expertly crafted by our talented
                                chefs to create a menu that is both innovative
                                and authentic.
                            </p>
                        </div>
                        <div className="why-choose-us-item">
                            <h3>Our Ingredients</h3>
                            <p>
                                At Gama Sushi, we take pride in our commitment
                                to using the finest ingredients in crafting our
                                sushi and Japanese dishes. We source our seafood
                                from reputable suppliers who share our
                                dedication to quality and sustainability. Our
                                sushi rice is carefully selected for its texture
                                and flavor, and we use traditional Japanese
                                seasonings and sauces to enhance the taste of
                                our dishes.
                            </p>
                        </div>
                        <div className="why-choose-us-item">
                            <h3>Our Menu</h3>
                            <p>
                                At Gama Sushi, our menu is a reflection of our
                                commitment to excellence and our passion for
                                Japanese cuisine. From traditional sushi rolls
                                to innovative creations, each dish is carefully
                                crafted to delight the senses and satisfy the
                                palate. With its blend of traditional flavors
                                and modern flair, our menu is sure to delight
                                sushi enthusiasts and food lovers alike.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="follow-us-instagram">
                    <h2>Follow us on Instagram</h2>
                    <div className="instagram-photos-container">
                        <a
                            href="https://www.instagram.com/gamasushi702/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-photo-link"
                        >
                            <div className="instagram-photo crabrangoon">
                                <img src={crabrangoon} alt="Instagram 1" />
                                <div className="photo-overlay">
                                    <span className="overlay-text">
                                        Crab Rangoon
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a
                            href="https://www.instagram.com/gamasushi702/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-photo-link"
                        >
                            <div className="instagram-photo ramensoup">
                                <img src={ramensoup} alt="Instagram 2" />
                                <div className="photo-overlay">
                                    <span className="overlay-text">
                                        Ramen Soup
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a
                            href="https://www.instagram.com/gamasushi702/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-photo-link"
                        >
                            <div className="instagram-photo chickenkarrage">
                                <img src={chickenkarrage} alt="Instagram 3" />
                                <div className="photo-overlay">
                                    <span className="overlay-text">
                                        Chicken Karaage
                                    </span>
                                </div>
                            </div>
                        </a>
                        <a
                            href="https://www.instagram.com/gamasushi702/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-photo-link"
                        >
                            <div className="instagram-photo spicytuna">
                                <img src={spicytuna} alt="Instagram 4" />
                                <div className="photo-overlay">
                                    <span className="overlay-text">
                                        Spicy Tuna
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="location-hours">
                    <h2>Visit Our Location!</h2>
                    <div className="google-maps-container">
                        <iframe
                            title="Google Maps"
                            width="100%"
                            height="200"
                            loading="lazy"
                            allowFullScreen
                            frameBorder="0"
                            style={{
                                border: '3px solid black',
                                borderRadius: '5px',
                            }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d322253.9445257926!2d-115.27972618023456!3d36.16994120000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1646949041557!5m2!1sen!2sus"
                        ></iframe>
                        <div className="centered-paragraph">
                            <p
                                className="big-text"
                                style={{ fontWeight: 'bold' }}
                            >
                                123 Main Street, Las Vegas, Nevada, 88901
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;
