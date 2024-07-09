import React from 'react'
import { useCart } from '../../contexts/CartContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './Cart.css'

const Cart = () => {
    const { cart, clearCart, calculateTotal } = useCart();

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
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
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
                    <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
                </>
            )}
        </div>
    );
};

export default Cart;