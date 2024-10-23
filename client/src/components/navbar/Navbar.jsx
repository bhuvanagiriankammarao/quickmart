// src/components/Navbar.jsx
import React from "react";


// Import the logo from the assets/images folder
import logo from "../../assets/images/logo.png";
import { FaSearch, FaUserCircle, FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-20 h-20 " />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="hover:text-green-500 cursor-pointer">Home</li>
          <li className="hover:text-green-500 cursor-pointer">Shop</li>
          <li className="hover:text-green-500 cursor-pointer">About</li>
          <li className="hover:text-green-500 cursor-pointer">Contact</li>
        </ul>

        {/* Icons Section */}
        <div className="flex items-center gap-6">
          <FaUserCircle size={22} className="cursor-pointer" />
          <span className="hover:text-green-500 cursor-pointer">Sign In</span>
          <FaSearch size={22} className="cursor-pointer" />
          <FaHeart size={22} className="cursor-pointer" />
          <FaShoppingCart size={22} className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
