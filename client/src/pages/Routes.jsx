// src/pages/Routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import About from './About';
import Contact from './Contact';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SearchResults from './SearchResults';
import Cart from './Cart';
import Wishlist from './Wishlist'; // Import Wishlist page

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} /> {/* Add the wishlist route */}
    </Routes>
  );
};

export default AppRoutes;
