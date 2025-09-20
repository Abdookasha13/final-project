import React, { Fragment } from 'react'
import "./Newsletter.css"

const Newsletter = () => {
    return (
        <Fragment>
            <div id="it-newsletter" className="it-newsletter-area">
                {/* Shapes */}
                <div className="it-newsletter-shape-1 d-none d-lg-block">
                    <img src="/Images/shape-1-1.png" alt="shape 1" />
                </div>
                <div className="it-newsletter-shape-2 d-none d-lg-block">
                    <img src="/Images//shape-1-2.png" alt="shape 2" />
                </div>
                <div className="it-newsletter-shape-3 d-none d-xl-block">
                    <img src="/Images//shape-1-3.png" alt="shape 3" />
                </div>
                <div className="it-newsletter-shape-4 d-none d-xl-block">
                    <img src="/Images//shape-1-4.png" alt="shape 4" />
                </div>
                {/* Content */}
                <div className="container">
                    <div className="row align-items-center">
                        {/* Left side */}
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="it-newsletter-left">
                                <h4 className="text-white pb-3">Join Our Newsletter</h4>
                                <span>
                                    Subscribe our newsletter to get our latest update &amp; news.
                                </span>
                            </div>
                        </div>
                        {/* Right side */}
                        <div className="col-xl-6 col-lg-6 col-md-6 text-end">
                            <div className="it-newsletter-right">
                                <input type="text" placeholder="Enter your email:" />
                                <button className="it-btn" type="submit">
                                    <span>Subscribe Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Newsletter