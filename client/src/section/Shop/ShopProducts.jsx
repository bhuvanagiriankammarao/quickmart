
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";

const ShopProducts = () => {
  // State for fetched products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 32; // Adjust the number of products per page as needed

  // Fetch products from an API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/get");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll to the top of the window
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-8 ">
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 
      px-4 max-sm:px-0 max-sm:gap-6  gap-x-6 
      gap-y-10  max-sm:pt-28 max-lg:pr-24 max-xl:pr-24
      ">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            imgURL={product.image}
            name={product.name}
            quantity={product.quantity}
            price={product.price}
            originalprice={product.originalprice}
            productId={product.productId}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-16">
        {/* Previous Button */}
        <button
          className={`px-4 py-2 mx-1 ${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-200"
          } rounded`}
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </button>
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-yellow-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {/* Next Button */}
        <button
          className={`px-4 py-2 mx-1 ${
            currentPage === totalPages ? "bg-gray-300" : "bg-gray-200"
          } rounded`}
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