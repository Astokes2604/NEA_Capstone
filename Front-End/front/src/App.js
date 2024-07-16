import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Home from './components/Home/Home';
import CatalogPage from './components/CatalogPage/CatalogPage';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import ContactUs from './components/ContactUs/ContactUs';
import AboutUs from './components/AboutUs/AboutUs';
import SignUp from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import './App.css';

function App() {
    return (
        <Router>
            <CartProvider>
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<CatalogPage />} />
                        <Route path="/item/:id" element={<ItemDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;
