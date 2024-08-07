import React, { useState } from 'react';
import axios from 'axios';
import './LocationFinder.css';

const LocationFinder = () => {
    const [zipCode, setZipCode] = useState('');
    const [radius, setRadius] = useState(25);
    const [gyms, setGyms] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/gyms?zip=${zipCode}&radius=${radius}`);
            const data = response.data;
            if (data.status === 'OK' && data.results) {
                setGyms(data.results);
            } else {
                setError('No gyms found.');
                setGyms([]);
            }
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
                <select value={radius} onChange={(e) => setRadius(parseInt(e.target.value))}>
                    <option value={25}>25 miles</option>
                    <option value={50}>50 miles</option>
                    <option value={75}>75 miles</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="gym-results">
                {gyms.map((gym, index) => (
                    <div key={index} className="gym">
                        <h2>{gym.name}</h2>
                        {gym.geometry && gym.geometry.location && (
                            <p>
                                Location: {gym.geometry.location.lat}, {gym.geometry.location.lng}
                            </p>
                        )}
                        <p>Address: {gym.vicinity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationFinder;
