import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart); // Fetch cart items from Redux
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="shadow-md p-4 font-poppins h-20 lg:h-24 pt-6">
      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
        {/* Logo Section */}
        <div className="flex justify-between w-full lg:w-auto items-center mb-4 lg:mb-0">
          <Link to="/" className="flex items-center ">
            <img src={logo} alt="Logo" className=" w-40  h-30  " />
          </Link>

          <div className="flex items-center gap-3 lg:hidden">
            <Link to="/wishlist">
              <FaHeart size={20} className="cursor-pointer hover:text-red-600" />
            </Link>
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart size={20} className="cursor-pointer hover:text-gray-600" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
            <button onClick={handleSignInClick} className="flex items-center gap-2 hover:text-gray-500 font-medium">
              <FaUserCircle size={20} />
              <span className="text-sm">Sign In</span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-900 lg:hidden">
              <FaBars size={20} />
            </button>
          </div>
        </div>

        {/* Menu Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row gap-6 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 text-blue-900 lg:static absolute top-20 left-0 z-50 font-500`}
        >
          <li className="hover:text-dimGray hover:underline">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li className="hover:text-dimGray hover:underline">
            <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          </li>
          <li className="hover:text-dimGray hover:underline">
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          </li>
          <li className="hover:text-dimGray hover:underline">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="w-full lg:w-auto lg:mt-0 flex pt-6 lg:pt-0">
          <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-[22rem]">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="absolute right-4 top-2.5 cursor-pointer text-blue-900 font-medium">
              <FaSearch size={18} />
            </button>
          </form>
        </div>

        {/* Icons + Sign In for Desktop */}
        <div className="hidden lg:flex items-center gap-6 text-blue-900">
          <Link to="/wishlist">
            <FaHeart size={24} className="cursor-pointer hover:text-red-600" />
          </Link>
          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart size={24} className="cursor-pointer hover:text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>
          <button onClick={handleSignInClick} className="flex items-center gap-2 hover:text-gray-500 font-medium">
            <FaUserCircle size={24} />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
