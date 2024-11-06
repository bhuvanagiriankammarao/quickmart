import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { shopProducts } from '../../data';
import ProductCard from '../../components/ProductCard';

const ShopProducts = () => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Adjust the number of products per page as needed

  // Calculate total pages based on the number of products
  const totalPages = Math.ceil(shopProducts.length / itemsPerPage);

  // Get the products to display for the current page
  const currentProducts = shopProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll to the top of the window
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls smoothly to the top
  };

  // Handle navigation to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  // Handle navigation to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  // Change page when clicking a specific number
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  return (
    <div className="py-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4">
        {currentProducts.map((product) => (
          // <Link to='/category' key={product.name}>
          //   <ProductCard {...product} />
          // </Link>
          <ProductCard {...product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-16">
        {/* Previous Button */}
        <button 
          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'} rounded`} 
          disabled={currentPage === 1} 
          onClick={handlePrevPage}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index} 
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`} 
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
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

export default ShopProducts;
