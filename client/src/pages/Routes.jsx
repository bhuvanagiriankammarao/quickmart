// src/pages/Routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';  // Updated import path
import Shop from './Shop/Shop';  // Updated import path
import About from './About/About';  // Updated import path
import Contact from './Contact/Contact';  // Updated import path
import SignIn from './SignIn/SignIn';  // Updated import path
import SignUp from './SignUp/SignUp';  // Updated import path
import SearchResults from './SearchResults/SearchResults';  // Updated import path
import Cart from './Cart/Cart';  // Updated import path
import Wishlist from './Wishlist/Wishlist';  // Updated import path
import Category from './Category/Category';

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
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/category" element={<Category />} />
    </Routes>
  );
};

export default AppRoutes;
