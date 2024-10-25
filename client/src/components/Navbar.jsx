// src/components/navbar/Navbar.jsx
import React, { useContext, useState } from "react";
import { FaSearch, FaUserCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";  
import logo from "../assets/images/logo.png"; 

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState(''); // Local state for search input
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle sign-in button click
  const handleSignInClick = () => {
    navigate('/signin'); // Redirect to Sign In page
  };

  // Function to handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Redirect to search results page
    }
  };

  return (
    <nav className=" shadow-md p-4 font-poppins h-24 pt-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo + Navigation Links */}
        <div className="flex items-center gap-12">
          <Link to='/'>
          <img src={logo} alt="Logo" className="w-40 h-30 flex items-start" />
          </Link>

          <ul className="hidden md:flex gap-6 text-lg font-bold text-blue-900
          hover:text-gray-600 cursor-pointer">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li >
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 mx-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="absolute right-4 top-2.5 cursor-pointer  text-blue-900">
              <FaSearch size={22} />
            </button>
          </form>
        </div>

        {/* Right Section: Icons + Sign In */}
        <div className="flex items-center gap-6  text-blue-900">
          <Link to="/wishlist">
            <FaHeart size={22} className="cursor-pointer  hover:text-gray-600" />
          </Link>
          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart size={22} className="cursor-pointer  hover:text-gray-600" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
          <button
            onClick={handleSignInClick} // Updated onClick to use navigate
            className="flex items-center gap-2 hover:text-gray-500 font-bold"
          >
            <FaUserCircle size={22} />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


