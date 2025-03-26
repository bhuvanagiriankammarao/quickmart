import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const ProductsHome = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/products/random'); // Update the URL if needed
        setRandomProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-center text-dimGray text-2xl sm:text-3xl md:text-4xl lg:text-custom-32 mb-8 font-poppins font-bold max-sm:text-custom-32 underline">
        Our Products
      </h2>
      <div 
      // className="flex-wrap justify-center mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 
      px-4 max-sm:px-0 max-sm:gap-6  gap-x-6 
      gap-y-10  max-sm:pt-28 max-lg:pr-24
      "
      >
        {randomProducts.map((product) => (
          <ProductCard
            key={product.name}
            productId={product.productId}
            imgURL={product.image}
            name={product.name}
            quantity={product.quantity}
            price={product.price}
            originalprice={product.originalprice}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/shop">
          <button
            className="text-orangeCustom bg-white text-sm w-48 px-6 py-2 rounded-md border border-orange-500 hover:bg-orange-600 hover:text-white"
            onClick={scrollToTop}
          >
            Show More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsHome;
