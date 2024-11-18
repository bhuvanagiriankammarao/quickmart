// import React, { useState, useEffect } from 'react';
// import ProductCard from '../../components/ProductCard';

// const ShopProducts = () => {
//   const [products, setProducts] = useState([]); // State to hold fetched products
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 16;

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/products');
//         if (response.ok) {
//           const data = await response.json();
//           setProducts(data); // Set fetched products
//         } else {
//           console.error('Failed to fetch products');
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Pagination logic
//   const totalPages = Math.ceil(products.length / itemsPerPage);
//   const currentProducts = products.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       scrollToTop();
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//       scrollToTop();
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     scrollToTop();
//   };

//   return (
//     <div className="py-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4">
//         {currentProducts.map((product) => (
//           <ProductCard key={product._id} {...product} />
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-16">
//         <button 
//           className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'} rounded`} 
//           disabled={currentPage === 1} 
//           onClick={handlePrevPage}
//         >
//           Previous
//         </button>
//         {[...Array(totalPages)].map((_, index) => (
//           <button 
//             key={index} 
//             className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`} 
//             onClick={() => handlePageClick(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button 
//           className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-200'} rounded`} 
//           disabled={currentPage === totalPages} 
//           onClick={handleNextPage}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShopProducts;
/////////////////////////////////////////// second responces //////////////////
   


import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';

const ShopProducts = () => {
 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/get'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch products');
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
  }, []);

  
  const totalPages = Math.ceil(products.length / itemsPerPage);

 
  const currentProducts = products.slice(
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-8">
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

     
      <div className="flex justify-center mt-16">
       
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
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`} 
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

export default ShopProducts;



     

