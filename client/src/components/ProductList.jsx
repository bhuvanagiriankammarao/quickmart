import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryProducts } from '../data';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { categoryId } = useParams();

  // Filter products by category
  const categoryProductsArray = categoryProducts.filter(
    (product) => product.categoryId === Number(categoryId)
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Adjust as needed
  const totalPages = Math.ceil(categoryProductsArray.length / itemsPerPage);

  // Get the products for the current page
  const currentProducts = categoryProductsArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  return (
    <div className="py-8">
      <h2 className="text-center text-dimGray text-2xl sm:text-3xl md:text-4xl lg:text-custom-32 mb-8 font-poppins font-bold max-sm:text-custom-32">
        Products
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {currentProducts.map((product) => (
          // <Link to="/shop" key={product.id}>
          //   <ProductCard {...product} />
          // </Link>
          <ProductCard {...product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10">
        <button
          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'} rounded`}
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-200'} rounded`}
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>


    </div>
  );
};

export default ProductList;
