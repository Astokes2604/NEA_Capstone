import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemDetails.css';

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:5000/catalog/${id}`);
                const data = await response.json();
                setItem(data);
                if (data.colors && data.colors.length > 0) {
                    setSelectedColor(data.colors[0]);
                }
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItem();
    }, [id]);

    const handleAddToCart = () => {
        // Add to cart logic
        console.log('Add to cart:', { item, selectedColor, selectedSize, quantity });
        navigate('/cart');
    };

    if (!item) return <div>Loading...</div>;

    return (
        <div className="item-details">
            <img src={item.image || 'default-image-path.jpg'} alt={item.name} className="item-image" />
            <div className="item-info">
                <h1>{item.name || 'No Name Available'}</h1>
                <p className="item-price">{item.price ? `$${item.price.toFixed(2)}` : 'Price not available'}</p>
                <div className="item-options">
                    <div className="item-colors">
                        <label>Color:</label>
                        {item.colors && item.colors.length > 0 ? item.colors.map((color) => (
                            <button
                                key={color}
                                className={`color-button ${color === selectedColor ? 'selected' : ''}`}
                                onClick={() => setSelectedColor(color)}
                            >
                                {color}
                            </button>
                        )) : <p>No colors available</p>}
                    </div>
                    <div className="item-sizes">
                        <label>Size:</label>
                        {item.sizes && item.sizes.length > 0 ? item.sizes.map((size) => (
                            <button
                                key={size}
                                className={`size-button ${size === selectedSize ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        )) : <p>No sizes available</p>}
                    </div>
                    <div className="item-quantity">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                    </div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
