import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import catalogData from '../../catalogData';
import './ItemDetails.css';

const ItemDetails = () => {
    const { itemId } = useParams();
    const item = catalogData.find(item => item.id === parseInt(itemId));
    
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(item.sizes[0]);
    const [color, setColor] = useState(item.colors[0]);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <div className="item-details">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            
            <div className="options">
                <div className="option">
                    <label htmlFor="size">Size:</label>
                    <select id="size" value={size} onChange={handleSizeChange}>
                        {item.sizes.map(size =>  (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                <div className="option">
                    <label htmlFor="color">Color:</label>
                    <select id="color" value={color} onChange={handleColorChange}>
                        {item.colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>

                <div className="option">
                    <label htmlFor="quantity">Quantity:</label>
                    <input 
                        type="number" 
                        id="quantity" 
                        value={quantity} 
                        onChange={handleQuantityChange} 
                        min="1"
                    />
                </div>
            </div>

            <button>Add to Cart</button>
        </div>
    );
};

export default ItemDetails;