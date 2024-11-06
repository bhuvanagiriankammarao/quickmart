import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../store/cartSlice';
import { removeFromWishlist } from '../../store/wishlistSlice';
import { FaEllipsisV, FaHeart, FaShare } from 'react-icons/fa';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);

  const addToCart = (item) => {
    dispatch(add(item));
    dispatch(removeFromWishlist(item));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.name}
              className="relative flex flex-col items-center rounded-lg p-4 pb-10 w-56 hover:shadow-xl transition-shadow group">
              <div className="mb-3 overflow-hidden">
                <img
                  src={item.imgURL}
                  alt={item.name}
                  className="w-40 h-40 max-sm:h-40 max-sm:w-24 object-cover 
                  transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-left font-poppins w-full h-28 bg-[#F4F5F7] p-2">
                <p className="text-lg font-semibold text-dimGray">{item.name}</p>
                <p className="text-custom-14 font-500 text-stoneGray mb-2">{item.quantity}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <p className="text-custom-16 font-bold text-black">{item.price}</p>
                  <p className="text-sm text-gray-400 line-through">{item.orignalPrice}</p>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center
              bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity
              duration-300">
                <button
                  onClick={() => addToCart(item)}
                  className="text-orangeCustom font-semibold mb-4 bg-white 
                  w-40 h-12 rounded-lg group-hover:opacity-100 transition-opacity">
                  Add to Cart
                </button>
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
                  <span
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => dispatch(removeFromWishlist(item))}>
                    <FaHeart className="text-red-500" />
                    <span>Remove</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
