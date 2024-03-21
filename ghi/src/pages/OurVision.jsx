import React from 'react'
import '../styles/css/ourvision.css'
import ourvisionheader from '../images/ourvisionheader.jpg'
import sushiplattervision from '../images/sushiplattervision.jpg'
import ourvisionsoup from '../images/ourvisionsoup.jpg'
import ourvisiondumplings from '../images/ourvisiondumplings.jpg'
import sushigroup from '../images/sushigroup.png'

const OurVision = () => {
    return (
        <section className="our-vision">
            <div className="container-fluid">
                <div className="container">
                    <div className="row gx-0">
                        <div className="col-12 col-lg-10 mb-4 width-7 mb-lg-4">
                            <div className="row">
                                <div className="ml-5 col-12 visionpictures">
                                    <img
                                        className="img-fluid rounded"
                                        src={ourvisionheader}
                                        alt="Our Vision"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <h1 className="text-center">Our Vision</h1>
                            <h3 className="text-center fs-1 text">
                                At Gama Sushi, our vision begins with an
                                unwavering commitment to quality. From the
                                freshest fish to the crispest vegetables, every
                                ingredient is meticulously selected to ensure
                                the highest standards are met. Our skilled chefs
                                blend traditional techniques with innovative
                                flavors, creating a unique dining experience
                                that honors the art of sushi. We believe that
                                quality is not just a part of our menu; it's the
                                essence of our identity.
                            </h3>

                            <div className="col-12 col-lg-10 mb-4 width-7 mb-lg-4 visionpictures">
                                <img
                                    src={sushiplattervision}
                                    className="img-fluid rounded"
                                    alt="Sushi"
                                />
                            </div>
                        </div>

                        <div className="col-12 mt-5 mb-4">
                            <h2 className="text-center">A Journey of Flavor</h2>
                            <h4 className="text-center fs-1 text">
                                Our vision extends beyond the plate, offering
                                our guests a journey of flavor that transcends
                                the ordinary. Each dish at Gama Sushi is crafted
                                to tell a story, inviting diners to explore the
                                rich tapestry of Japanese cuisine and its global
                                influences. Our menu is a carefully curated
                                collection of classics and modern creations,
                                designed to cater to both sushi connoisseurs and
                                newcomers alike. At Gama Sushi, every bite is an
                                adventure, an opportunity to discover new tastes
                                and rekindle old favorites.
                            </h4>
                        </div>
                        <div className="col-6 col-lg-5 mb-2 width-7 mb-lg-4 visionpictures">
                            <img
                                src={ourvisiondumplings}
                                className="img-fluid rounded"
                                alt="Dumplings"
                            />
                        </div>
                        <div className="col-6 col-lg-5 mb-2 width-7 mb-lg-4 visionpictures">
                            <img
                                src={ourvisionsoup}
                                className="img-fluid rounded"
                                alt="Soup"
                            />
                        </div>
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        <h2 className="text-center">Community and Culture</h2>
                        <h4 className="text-center fs-1 text">
                            Gama Sushi is more than a restaurant; it's a
                            community. We envision a space where food brings
                            people together, creating moments of joy and
                            celebration. Our commitment to culture extends
                            through our efforts to educate and engage, offering
                            workshops and events that delve into the heart of
                            sushi making and Japanese traditions. As we grow,
                            our goal is to foster a culture of inclusivity,
                            respect, and passion for the culinary arts. Gama
                            Sushi is not just a place to eat; it's a place to
                            belong, to learn, and to share in the beauty of a
                            meal made with love.
                        </h4>
                    </div>
                    <div className="col-12 col-lg-10 mb-4 width-7 mb-lg-4 visionpictures">
                        <img
                            src={sushigroup}
                            className="img-fluid rounded"
                            alt="Soup"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default OurVision
