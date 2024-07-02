import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <h1>New Era Athletics</h1>
                </Link>
            </div>
            <nav className="nav">
                {/* <Link to="/">Home</Link> */}
                <Link to="/catalog">Catalog</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <div className="cart">
                <Link to="/cart">Cart</Link>
            </div>
        </header>
    );
};

export default Header