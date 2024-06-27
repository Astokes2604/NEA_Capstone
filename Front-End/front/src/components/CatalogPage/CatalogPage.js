import React from 'react';
import catalogData from '../../catalogData';
import CatalogItem from '../CatalogItem/CatalogItem';

const CatalogPage = () => {
    return (
        <div className="catalog-page">
            {catalogData.map(item => (
                <CatalogItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CatalogPage;