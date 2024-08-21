import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setUsername(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUsername('');
        navigate('/');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <h1>New Era Athletics</h1>
                </Link>
                {isAuthenticated ? (
                    <p>Welcome, {username}</p>
                ) : (
                    <></>
                )}
            </div>
            <nav className="nav">
                <Link to="/catalog">Catalog</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/location-finder">Find Gyms</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/create-post">Create Post</Link>
                        <Link to="/posts">Post List</Link>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </nav>
            <div className="cart">
                <Link to="/cart">🛒</Link>
            </div>
        </header>
    );
};

export default Header;
