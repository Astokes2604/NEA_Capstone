import React, { useState } from 'react';
import axios from 'axios';
import './LocationFinder.css';

const LocationFinder = () => {
    const [zipCode, setZipCode] = useState('');
    const radius = 25;
    const [gyms, setGyms] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/gyms?zip=${zipCode}&radius=${radius}`);
            setGyms(response.data);
        } catch (err) {
            console.error('Error fetching gyms:', err);
            setError('Error fetching gyms. Please try again.');
            setGyms([]);
        }
    };

    return (
        <div className="location-finder">
            <h1>Find Gyms Near You</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                />
                <h3>Within 25 miles of your zip</h3>
                <button type="submit">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="gym-results">
                {gyms.map((gym, index) => (
                    <div key={index} className="gym">
                        <h2>{gym.name}</h2>
                        <p>Address: {gym.address}</p>
                        <ul className="gym-hours">
                            {gym.hours.map((hour, idx) => (
                                <li key={idx}>{hour}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationFinder;
