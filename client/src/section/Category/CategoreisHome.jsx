// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const PrevArrow = ({ onClick }) => (
//   <div
//     className="absolute left-2 z-10 cursor-pointer p-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-600 
//      text-white transform -translate-y-1/2 top-1/2 hover:scale-110 shadow-lg transition-transform duration-300"
//     onClick={onClick}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2}
//       stroke="currentColor"
//       className="w-4 h-4"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//     </svg>
//   </div>
// );

// const NextArrow = ({ onClick }) => (
//   <div
//     className="absolute right-1 z-10 cursor-pointer p-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 
//      text-white transform -translate-y-1/2 top-1/2 hover:scale-110 shadow-lg transition-transform duration-300"
//     onClick={onClick}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2}
//       stroke="currentColor"
//       className="w-6 h-6"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//     </svg>
//   </div>
// );

// const CategoriesHome = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [slidesToShow, setSlidesToShow] = useState(7);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   useEffect(() => {
//     const updateSlidesToShow = () => {
//       const width = window.innerWidth;
//       if (width < 640) setSlidesToShow(2); // Mobile
//       else if (width < 768) setSlidesToShow(3); // Tablet
//       else if (width < 1024) setSlidesToShow(5); // Small laptops
//       else setSlidesToShow(7); // Desktop
//     };

//     updateSlidesToShow();
//     window.addEventListener("resize", updateSlidesToShow);
//     return () => window.removeEventListener("resize", updateSlidesToShow);
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/admin/categories/"
//         );
//         setCategories(response.data || []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setError("Failed to load categories. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow,
//     slidesToScroll: 1,
//     autoplaySpeed: 2000,
//     autoplay: true,
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//   };

//   return (
//     <section className="container mx-auto p-4">
//       <h2 className="text-center text-dimGray text-2xl sm:text-3xl md:text-4xl  lg:text-custom-32 mb-8 font-poppins font-bold max-sm:text-custom-32 underline max-sm:pt-16 max-lg:pt-20">
//         Categories
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading categories...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : categories.length === 0 ? (
//         <p className="text-center text-gray-500">No categories available.</p>
//       ) : (
//         <div className="relative">
//           <Slider {...settings} className="m-4 overflow-hidden">
//             {categories.map((category) => (
//               <div
//                 key={category._id}
//                 className="bg-white p-4 transition-shadow duration-200"
//                 onClick={scrollToTop} // Scroll to top when navigating
//               >
//                 <Link to={`/categories/${category.name}`}>
//                   {category.image ? (
//                     <img
//                       src={category.image || "placeholder.png"}
//                       alt={category.name}
//                       className="w-32 h-32 object-cover rounded-3xl mx-auto mb-4 border-2 border-gray-100 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
//                     />
//                   ) : (
//                     <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}
//                   <h3 className="text-lg font-semibold text-center">
//                     {category.name}
//                   </h3>
//                 </Link>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       )}
//     </section>
//   );
// };

// export default CategoriesHome;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const CategoriesHome = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/admin/categories/");
//         setCategories(response.data || []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setError("Failed to load categories. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <section className="container mx-auto p-4">
//       <h2 className="text-center text-dimGray text-2xl sm:text-3xl font-bold underline mb-6">
//         Categories
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading categories...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : categories.length === 0 ? (
//         <p className="text-center text-gray-500">No categories available.</p>
//       ) : (
//         <div className="overflow-x-auto scrollbar-hide">
//           <div className="flex space-x-4 p-2">
//             {categories.map((category) => (
//               <Link
//                 key={category._id}
//                 to={`/categories/${category.name}`}
//                 className="flex flex-col items-center min-w-[100px] bg-white rounded-lg shadow-md hover:shadow-lg p-3 transition-transform transform hover:scale-105"
//               >
//                 <img
//                   src={category.image || "placeholder.png"}
//                   alt={category.name}
//                   className="w-20 h-20 object-cover rounded-full border border-gray-200"
//                 />
//                 <h3 className="text-sm font-semibold mt-2">{category.name}</h3>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default CategoriesHome;



// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing arrow icons

// const CategoriesHome = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollContainerRef = useRef(null);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/admin/categories/");
//         setCategories(response.data || []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setError("Failed to load categories. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Scroll function
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const { current } = scrollContainerRef;
//       const scrollAmount = 200; // Adjust scroll step
//       current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });

//       setTimeout(() => {
//         setScrollPosition(current.scrollLeft);
//       }, 300);
//     }
//   };

//   return (
//     <section className="container mx-auto p-4 relative">
//       <h2 className="text-center text-dimGray text-2xl sm:text-3xl font-bold underline mb-6">
//         Categories
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading categories...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : categories.length === 0 ? (
//         <p className="text-center text-gray-500">No categories available.</p>
//       ) : (
//         <div className="relative w-full">
//           {/* Left Arrow Button */}
//           {scrollPosition > 0 && (
//             <button
//               onClick={() => scroll("left")}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-700 p-2 rounded-full shadow-md z-10"
//             >
//               <FaChevronLeft size={20} />
//             </button>
//           )}

//           {/* Scrollable Category List (Scrollbar Hidden) */}
//           <div
//             ref={scrollContainerRef}
//             className="flex space-x-4 p-2 w-full overflow-x-scroll scrollbar-hide scroll-smooth"
//             style={{
//               scrollBehavior: "smooth",
//               scrollbarWidth: "none", // Hides scrollbar for Firefox
//               msOverflowStyle: "none", // Hides scrollbar for IE/Edge
//             }}
//           >
//             {categories.map((category) => (
//               <Link
//                 key={category._id}
//                 to={`/categories/${category.name}`}
//                 className="flex flex-col items-center min-w-[100px] bg-white  shadow-md hover:shadow-lg p-3 transition-transform transform hover:scale-105"
//               >
//                 <img
//                   src={category.image || "placeholder.png"}
//                   alt={category.name}
//                   className="w-32 h-32  object-cover   border-gray-200
//                     rounded-2xl mx-auto mb-4 border-2
//                     shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
//                 />
//                 <h3 className="text-sm font-semibold mt-2">{category.name}</h3>
//               </Link>
//             ))}
//           </div>

//           {/* Hide Scrollbar in WebKit Browsers */}
//           <style>
//             {`
//               .scrollbar-hide::-webkit-scrollbar {
//                 display: none;
//               }
//             `}
//           </style>

//           {/* Right Arrow Button */}
//           {scrollContainerRef.current &&
//             scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth + scrollPosition && (
//               <button
//                 onClick={() => scroll("right")}
//                 className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-700 p-2 rounded-full shadow-md z-10"
//               >
//                 <FaChevronRight size={20} />
//               </button>
//             )}
//         </div>
//       )}
//     </section>
//   );
// };

// export default CategoriesHome;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategoriesHome = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/categories/");
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container mx-auto px-6 py-4 relative">
      <h2
        className="text-3xl font-bold underline mb-6 text-center text-dimGray 
                   sm:text-3xl md:text-4xl lg:text-custom-32 font-poppins
                   max-sm:text-custom-32 max-sm:pt-16 max-lg:pt-32"
      >
        Categories
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading categories...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories available.</p>
      ) : (
        <div className="relative flex items-center w-full">
          {/* Left Scroll Button - Visible only on large screens */}
          <button
            onClick={() => scroll("left")}
            className="hidden lg:block absolute left-0 -translate-x-full bg-gray-700
             text-white p-3 rounded-full shadow-md opacity-80 hover:opacity-100
              transition z-10"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Scrollable Category List */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 p-3 w-full overflow-x-scroll scrollbar-hide scroll-smooth bg-white transition-shadow duration-200"
          >
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.name}`}
                className="flex flex-col items-center min-w-[120px] bg-white shadow-md hover:shadow-lg p-4 transition-transform hover:scale-105 rounded-lg"
              >
                <img
                  src={category.image || "placeholder.png"}
                  alt={category.name}
                  className="w-28 h-28 object-contain border rounded-lg shadow-md mb-2"
                />
                <h3 className="text-sm font-semibold text-gray-700">{category.name}</h3>
              </Link>
            ))}
          </div>

          {/* Right Scroll Button - Visible only on large screens */}
          <button
            onClick={() => scroll("right")}
            className="hidden lg:block absolute right-0 translate-x-full bg-gray-700
             text-white p-3 rounded-full shadow-md opacity-80 hover:opacity-100
              transition z-10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Hide Scrollbar in WebKit Browsers */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default CategoriesHome;




