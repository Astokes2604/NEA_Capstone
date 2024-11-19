import React, { useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './Cart.css';

const Cart = () => {
    const { cart, setCart, clearCart, calculateTotal } = useCart();

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/api/cart', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCart(response.data.cartItems);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchCartItems();
    }, [setCart]);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:5000/api/catalog/updateQuantity/${itemId}`, { quantity: newQuantity }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const updatedItem = response.data;
                const updatedCart = cart.map(item => 
                    item._id === updatedItem._id ? { ...item, quantity: updatedItem.quantity } : item
                );
                setCart(updatedCart);
            })
            .catch(error => console.error('Error updating quantity:', error));
    };

    const handleApprove = (orderID) => {
        console.log('Order approved:', orderID);
        clearCart();
    }

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h2>{item.name}</h2>
                                    <p>Color: {item.selectedColor}</p>
                                    <p>Size: {item.selectedSize}</p>
                                    <div className="quantity">
                                        {/* <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button> */}
                                        <span>{item.quantity}</span>
                                        {/* <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button> */}
                                    </div>
                                    <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                        <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
                    </ul>
                    <div className="cart-total">
                        <h2>Total: ${calculateTotal()}</h2>
                    </div>
                    <PayPalScriptProvider options={{ "client-id": "AcVpSd7CIQj2IFsLRPEXmWHx1Q6OsM9YVrQv9qmAMVRGj7eGsFuA10t1DHmKvi-TyMNbzjiNDNNfvEkY" }}>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: calculateTotal(),
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    handleApprove(data.orderID);
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                </>
            )}
        </div>
    );
};

export default Cart;