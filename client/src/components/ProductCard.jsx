import React from 'react';
import { Link } from 'react-router-dom';
import { add } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsisV, FaHeart, FaShare } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';

const ProductCard = ({ imgURL, name, quantity, price, orignalPrice }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);

  const isWishlisted = wishlist.some(item => item.name === name);

  const handleWishlist = () => {
    const product = { imgURL, name, quantity, price, orignalPrice };
    if (isWishlisted) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = () => {
    const product = { imgURL, name, quantity, price, orignalPrice };
    dispatch(add(product));
  };

  return (
    <div className="relative flex flex-col items-center ml-10
     max-sm:ml-16 rounded-lg p-4 w-56 hover:shadow-xl transition-shadow group">
      <div className="mb-3 overflow-hidden">
        
        <img
          src={imgURL}
          alt={name}
          className="w-40 h-40 max-sm:h-40 max-sm:w-24 object-cover 
          transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="text-left font-poppins w-full h-28 bg-[#F4F5F7] p-2">
        <p className="text-lg font-semibold text-dimGray">{name}</p>
        <p className="text-custom-14 font-500 text-stoneGay mb-2">{quantity}</p>
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-custom-16 font-bold text-black">Rs.{price}</p>
          <p className="text-sm text-gray-400 line-through">Rs.{orignalPrice}</p>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center
      bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity
      duration-300">
        <Link to="/cart" className="w-full flex justify-center" onClick={scrollToTop}>
          <button
            onClick={addToCart}
            className="text-orangeCustom font-semibold mb-4 bg-white 
            w-40 h-12 rounded-lg group-hover:opacity-100 transition-opacity">
            Add to cart
          </button>
        </Link>
        <div className="flex justify-around w-full cursor-pointer
         text-white font-semibold text-custom-13">
          <span className="flex items-center space-x-1">
            <FaShare />
            <span>Share</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaEllipsisV />
            <span>Compare</span>
          </span>
         
          <span className="flex items-center space-x-1 cursor-pointer"
            onClick={handleWishlist}>
            <FaHeart className={isWishlisted ? 'text-red-500' : ''} />
            <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
          </span>
         
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

