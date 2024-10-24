import React, { useContext } from "react";
import { FaSearch, FaUserCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";  // Import CartContext
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);  // Access cartItems from context

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="hover:text-green-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-green-500 cursor-pointer">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="hover:text-green-500 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-green-500 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Icons Section */}
        <div className="flex items-center gap-6">
          <FaUserCircle size={22} className="cursor-pointer" />
          <Link to="/signin" className="hover:text-green-500 cursor-pointer">Sign In</Link>
          <FaSearch size={22} className="cursor-pointer" />
          <FaHeart size={22} className="cursor-pointer" />
          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart size={22} className="cursor-pointer" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
