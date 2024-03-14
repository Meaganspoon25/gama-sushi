import React, { useState } from 'react';
import '../styles/css/home.css'; // Import scoped CSS for the home component
import Misosoup from '../images/Misosoup.png';
import Sushitray from '../images/Sushitray.png';
import Dumplings from '../images/Dumplings.png';
import Friedrice from '../images/Friedrice.png';
import Californiaroll from '../images/Californiaroll.png';
import Zarusoba from '../images/Zarusoba.png'; // Import smaller photo image

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [Misosoup, Sushitray, Dumplings];
    const smallImages = [Friedrice, Californiaroll, Zarusoba]; // Array of smaller photo images

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
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

            {/* Row of smaller photos */}
            <div className="small-photos">
                {smallImages.map((smallImage, index) => (
                    <img key={index} src={smallImage} alt={`Food ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default Home;
