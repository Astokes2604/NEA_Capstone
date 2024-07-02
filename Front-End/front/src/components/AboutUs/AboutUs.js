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
            <h4>
                Alexander Stokes
            </h4>
            <p>

            </p>
            <h4>
                Cole Tasso
            </h4>
            <p>

            </p>
            <h2><Link to="/contact">Contact Us</Link></h2>
        </div>
    )
}

export default AboutUs