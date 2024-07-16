import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/send-email', formData);
            alert('Email sent successfully');
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        }
        catch (error) {
            alert('Failed to send email');
        }
    };

    return (
        <div className="contact-us">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div className="social-media">
                <a href="https://www.instagram.com/newera_athletics/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://www.tiktok.com/@neweraathletics/" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            </div>
        </div>
    );
};

export default ContactUs;