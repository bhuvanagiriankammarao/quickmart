import React from 'react';
import { ourProducts } from '../data';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const ProductsHome = () => {
  return (
    <div className="py-8">
      <h2 className="text-center text-dimGray  text-custom-40 mb-8 font-poppins
      font-bold">Our Products</h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {ourProducts.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-8">
        <Link to='/shop'>
      <button className="text-orangeCustom bg-white text-sm w-48
      px-6 py-2 rounded-md border border-orange-500 hover:bg-orange-600 hover:text-white ">
       Show More
      </button>
      </Link>

      </div>
    </div>
  );
};

export default ProductsHome;
