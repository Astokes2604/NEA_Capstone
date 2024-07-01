import React from 'react';
import { Link } from 'react-router-dom';
import './CatalogItem.css';

const CatalogItem = ({ item }) => {
    return (
        <div className="catalog-item">
            <Link to={`/item/${item.id}`}>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>${item.price}</p>
            </Link>
        </div>
    );
};

export default CatalogItem;