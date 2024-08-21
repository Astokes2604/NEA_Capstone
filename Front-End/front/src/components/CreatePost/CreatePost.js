import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!description || !image) {
            setError('Please fill out all fields.');
            return;
        }
    
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/createpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.status === 201) {
                setSuccess('Post created successfully!');
                setDescription('');
                setImage(null);
                setError('');
            }
        } catch (err) {
            console.error('Error creating post:', err);
            setError('Error creating post');
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
