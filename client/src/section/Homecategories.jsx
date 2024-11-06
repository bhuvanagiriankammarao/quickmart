import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesHomePage } from '../data';



const HomeCategories = () => {
  // Function to scroll to top when navigating
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-center py-20 lg:py-20">
      {/* Header */}
      <div>
        <h1 className="font-bold font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-custom-32 text-dimGray">
          Our Categories
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-custom-20 font-poppins font-400 text-cloudGray mt-2">
          Top Grocery Categories
        </h2>
      </div>

      {/* Category Cards */}
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 mt-10">
        {categoriesHomePage.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center p-4 rounded-lg mb-8 md:mb-0"
          >
            {/* Category Image */}
            <Link to={`/category/${category.id}`}>
              <img 
                src={category.imgURL} 
                alt={category.title} 
                onClick={scrollToTop} 
                className="w-full h-40 sm:h-48 md:w-48 md:h-52 lg:w-52 object-cover mb-4" 
              />
            </Link>
        
            {/* Category Name */}
            <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-custom-24 text-dimGray">
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
