import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="post-list">
            {posts.map(post => (
                <div key={post._id} className="post-item">
                    <h3>{post.username}</h3>
                    <img src={`data:image/jpeg;base64,${post.image}`} alt="Post" />
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;