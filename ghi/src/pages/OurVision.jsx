import React from 'react'
import ourvisionheader from '../images/ourvisionheader.jpg'
import ourvisionsushi from '../images/ourvisionsushi.jpg'
import ourvisionsoup from '../images/ourvisionsoup.jpg'
import ourvisiondumplings from '../images/ourvisiondumplings.jpg'

const OurVision = () => {
    return (
        <section className="our-vision">
            <div className="container-fluid">
                <div className="container">
                    <div className="row gx-0">
                        <div className="col-12 col-lg-10 mb-4 width-5 mb-lg-4">
                        <div className="row">
                        <div className="col-12">
                            <img
                            src={ourvisionheader}
                            className="img-fluid w-100"
                            alt="Our Vision"
                            style={{ objectFit: 'cover', height: 'auto' }}
                            />
                        </div>
                        </div>
                        </div>
                        <div className="col-12">
                            <h1 className="text-center">Our Vision</h1>
                            <h3 className="text-center fs-1 text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quia facilis neque culpa alias
                                impedit, deleniti blanditiis facere itaque!
                                Dignissimos rerum, molestias quis corporis a
                                repudiandae? Vitae nobis nisi pariatur
                                doloribus.
                            </h3>
                        </div>
                        <div className="col-12 mt-4 mb-4">
                            <h3 className="text-center fs-1 text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quia facilis neque culpa alias
                                impedit, deleniti blanditiis facere itaque!
                                Dignissimos rerum, molestias quis corporis a
                                repudiandae? Vitae nobis nisi pariatur
                                doloribus.
                            </h3>
                        </div>
                        <div className="col-4">
                            <img
                                src={ourvisionsushi}
                                className="img-fluid rounded"
                                alt="Sushi"
                            />
                        </div>
                        <div className="col-4">
                            <img
                                src={ourvisiondumplings}
                                className="img-fluid rounded"
                                alt="Dumplings"
                            />
                        </div>
                        <div className="col-4">
                            <img
                                src={ourvisionsoup}
                                className="img-fluid rounded"
                                alt="Soup"
                            />
                        </div>
                    </div>
                        <div className="col-12 mt-4 mb-4">
                            <h3 className="text-center fs-1 text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quia facilis neque culpa alias
                                impedit, deleniti blanditiis facere itaque!
                                Dignissimos rerum, molestias quis corporis a
                                repudiandae? Vitae nobis nisi pariatur
                                doloribus.
                            </h3>
                        </div>
                </div>
            </div>
        </section>
    )
}
export default OurVision
