import React from 'react';
import { categoriesHomePage } from '../data';
import { Link } from 'react-router-dom';

const HomeCategories = () => {
  return (
    <div className="text-center py-20">
      {/* Header */}
      <div>
        <h1 className="font-bold font-poppins text-custom-32 text-dimGray">
          Our Categories</h1>
        <h2 className="text-custom-20 font-poppins font-400 text-cloudGray mt-2">
          Top Grocery Categories</h2>
      </div>

      {/* Category Cards */}
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 mt-10">
        {categoriesHomePage.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center p-4 rounded-lg mb-8 md:mb-0"
          >
            {/* Image */}
            <Link to="/category">
              <img src={item.imgURL} alt={item.title} className="w-full h-48 object-cover
               mb-4 md:w-52" />
            </Link>
        
            <p className="font-semibold text-custom-24 text-dimGray">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
