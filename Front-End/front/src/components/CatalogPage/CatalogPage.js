import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CatalogItem from '../CatalogItem/CatalogItem';
import './CatalogPage.css';

const CatalogPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/catalog');
                const data = await response.json();
                console.log(data); // Check the data in the console
                setItems(data);
            } catch (error) {
                console.error('Error fetching catalog items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="catalog-page">
            {items.map((item) => (
                <Link key={item._id} to={`/item/${item._id}`} style={{ textDecoration: 'none' }}>
                    <CatalogItem
                        key={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        colors={item.colors}
                        sizes={item.sizes}
                    />
                </Link>
            ))}
        </div>
    );
};

export default CatalogPage;
