import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to New Era Athletics</h1>
            <p>
                At New Era Athletics, we offer high-quality athletic wear and merchandise that inspires and empowers you to achieve your best. Explore our catalog to find the perfect gear for your training, competition, or leisure.
            </p>
            <Link to="/catalog" className="home-link">Catalog</Link>
        </div>
    );
};

export default Home;
