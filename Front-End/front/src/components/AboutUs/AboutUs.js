import React from 'react'
import { Link } from 'react-router-dom'
import './AboutUs.css'

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About New Era Athletics</h1>
            <h2>Our Mission</h2>
            <p>
                Here at New Era Athletics we strive to achive a
                comfort stylish fit for on the street and in the gym.

            </p>
            <h2>Our Story</h2>
            <div className="ceo">
                <img src="../../images/AlexanderStokes.jpg" alt="Alexander Stokes" className="ceo-image" />
                <div>
                    <h4>
                        Alexander Stokes
                    </h4>
                    <p>

                    </p>
                </div>
            </div>
            <div className="ceo">
                <img src="../../images/ColeTasso.jpg" alt="Cole Tasso" className="ceo-image" />
                <div>
                    <h4>
                        Cole Tasso
                    </h4>
                    <p>

                    </p>
                </div>
            </div>
            <h2><Link to="/contact">Contact Us</Link></h2>
        </div>
    )
}

export default AboutUs