import React from 'react';
import { ourProducts } from '../data';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const ProductsHome = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls smoothly to the top
  };

  return (
    <div className="py-8">
      <h2 className="text-center text-dimGray text-2xl sm:text-3xl md:text-4xl lg:text-custom-32 mb-8 font-poppins
      font-bold max-sm:text-custom-32">Our Products</h2>
       
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 
      px-4">
        {ourProducts.map((product) => (
          // <Link 
          //   to={`/product/${product.id}`} 
          //   key={product.id}
          //   onClick={scrollToTop}
          // >
          //   <ProductCard {...product} />
          // </Link>

          <ProductCard {...product} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-12">
        <Link to='/shop'>
          <button className="text-orangeCustom bg-white text-sm w-48
          px-6 py-2 rounded-md border border-orange-500 hover:bg-orange-600
          hover:text-white"
          onClick={scrollToTop}>
          Show More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsHome;
