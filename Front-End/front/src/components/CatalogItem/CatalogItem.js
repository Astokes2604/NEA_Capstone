import React from 'react';
import './CatalogItem.css';

const CatalogItem = ({ name, price, image, colors, sizes }) => {
    return (
        <div className="catalog-item">
            <img src={image || 'default-image-path.jpg'} alt={name || 'Item'} className="catalog-item-image" />
            <div className="catalog-item-info">
                <h2>{name || 'No Name Available'}</h2>
                <p>{price ? `$${price.toFixed(2)}` : 'Price not available'}</p>
            </div>
        </div>
    );
};

export default CatalogItem;
