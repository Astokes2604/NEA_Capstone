import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
            axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, []);

    return (
        <div className="home">
            <div className="hero-section">
                <h1>Welcome to New Era Athletics</h1>
                <p>
                    The start of a New Era is about to begin. Weightlifting, Bodybuilding, Power Lifting, 
                    you name it in the fitness industry is coming into a new era and is making a shift 
                    that will change how the world views all of fitness. New Era Athletics is here for the 
                    change of era's and is showcasing the New Era by bringing it from tomorrow to today 
                    for the world. It is time to stop denying that the future is here and to welcome THE 
                    NEW ERA OF ATHLETICS!
                </p>
                <a href="#features" className="cta-button">Explore Features</a>
            </div>
            <div className="features" id="features">
                <div className="feature">
                    <h2>Gym Locator</h2>
                    <p>Find the nearest gym locations to you with our interactive gym locator.</p>
                    <a href="/location-finder">Learn More</a>
                </div>
                <div className="feature">
                    <h2>Catalog of Items</h2>
                    <p>Browse our extensive catalog of fitness apparel.</p>
                    <a href="/catalog">Explore Catalog</a>
                </div>
                <div className="feature">
                    <h2>About Us</h2>
                    <p>Learn more about our mission and the team behind New Era Athletics.</p>
                    <a href="/about">Read More</a>
                </div>
                <div className="feature">
                    <h2>Contact Us</h2>
                    <p>Have questions or need support? Get in touch with us.</p>
                    <a href="/contact">Contact Us</a>
                </div>
                <div className="feature">
                    <h2>Sign Up</h2>
                    <p>Join our community and start your fitness journey today.</p>
                    <a href="/signup">Sign Up</a>
                </div>
                {!loggedIn && (
                    <div className="feature">
                        <h2>Login</h2>
                        <p>Already a member? Log in to access your account.</p>
                        <a href="/login">Login</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
