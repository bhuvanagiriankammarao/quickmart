<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignupForm from './pages/signup';
function App() {
  const [count, setCount] = useState(0)
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SearchResults from './pages/SearchResults';
import Cart from './pages/Cart';  // Cart Page
import { CartProvider } from './context/CartContext';  // Import CartProvider
>>>>>>> f22d7033325aefb2f97128b6adac4f7bf1d8f484

const App = () => {
  return (
    <Router>
      <CartProvider>  {/* Wrap the app with CartProvider */}
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={<Cart />} /> {/* Cart Route */}
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
