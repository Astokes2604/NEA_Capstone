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
                    I’m Alexander Stokes, and I've been training since I was 17. Growing up with parents who were 
                    fitness enthusiasts, I decided to give it a try, and soon discovered my own passion for the fitness 
                    world. Inspired by the fantastic clothing brands in the fitness industry, I wanted to create 
                    something that would inspire others. My goal is to help people find their own love for fitness and 
                    lead healthier, happier lives. Through my journey, I've learned that fitness is not just about the 
                    physical aspect, but also about mental strength and perseverance. I hope my story and my work can motivate 
                    others to start their own fitness journey and find their passion.
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
                    I'm Cole Tasso, and I've been training since I was 14. My passion is fitness and 
                    nutrition. Growing up, I watched athletes on YouTube wearing gym brands that I really 
                    liked. Getting those pieces that those athletes had made me feel one step closer to 
                    achieving my goals. Inspired by this, we strive to make New Era Athletics an inspirational 
                    brand that empowers new athletes. Our mission is to help them feel strong and confident in the gym.
                    </p>
                </div>
            </div>
            <h2><Link to="/contact">Contact Us</Link></h2>
        </div>
    )
}

export default AboutUs