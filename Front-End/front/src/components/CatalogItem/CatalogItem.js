import React from 'react';

const CatalogItem = ({ item }) => {
    return (
        <div className="catalog-item">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price}</p>
        </div>
    );
};

export default CatalogItem;