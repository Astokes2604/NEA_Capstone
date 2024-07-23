import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    // Function to format date and time
    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="post-list">
            {posts.map((post) => (
                <div key={post._id} className="post">
                    <h2>{post.username}</h2>
                    <p className="post-time">{formatDate(post.createdAt)}</p>
                    <img src={`http://localhost:5000/${post.image}`} alt={post.description} />
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;
