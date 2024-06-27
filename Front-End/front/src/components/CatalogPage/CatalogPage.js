import React from 'react';
import catalog from '../catalogData';
import CatalogItem from './CatalogItem';

const CatalogPage = () => {
    return (
        <div>
            {catalog.map(item => (
                <CatalogItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CatalogPage