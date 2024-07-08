import React from 'react'
import { useCart } from '../../contexts/CartContext';
import './Cart.css'

const Cart = () => {
    const { cart, clearCart } = useCart();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

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
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <h2>Total: ${calculateTotal()}</h2>
                    </div>
                    <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
                </>
            )}
        </div>
    );
};

export default Cart;