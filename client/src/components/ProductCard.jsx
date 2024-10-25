import React from 'react';

const ProductCard = ({ imgURL, name, quantity, price, orignalPrice }) => {
  return (
    <div className="relative flex flex-col items-center  rounded-lg  
    p-4 w-56 hover:shadow-xl transition-shadow group">
      {/* Product Image */}
      <div className="w-full h-40 mb-3 overflow-hidden">
        <img
          src={imgURL}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="text-left font-poppins w-full h-28 bg-[#F4F5F7]">
        <p className="text-custom-20 font-semibold text-dimGray">{name}</p>
        <p className="text-custom-14 font-500 text-stoneGay mb-2">{quantity}</p>

        {/* Price Section */}
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-custom-16 font-bold text-black">{price}</p>
          <p className="text-sm text-gray-400 line-through">{orignalPrice}</p>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute inset-0 flex flex-col items-center justify-center
      bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Add to Cart Button */}
        <button className="text-orangeCustom font-semibold mb-4 bg-white
         absolute w-[202px] h-[48px] gap-0 opacity-0 
         group-hover:opacity-100 transition-opacity">Add to cart</button>

        {/* Action Buttons */}
        <div className="flex justify-around w-full px-4 
        cursor-pointer text-white font-semibold pt-20">
          <span>Share</span>
          <span>Compare</span>
          <span>Like</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
