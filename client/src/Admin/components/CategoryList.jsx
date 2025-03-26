//222
import React from 'react';

const CategoryList = ({ categories, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {categories.map((category) => (
        <div
          key={category._id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm  hover:shadow-md transition-shadow duration-300 p-5 flex flex-col"
        >
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          </div>
          <div className="mt-auto flex space-x-3">
            <button
              onClick={() => onEdit(category)} 
              className="flex items-center  justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold  shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition duration-300 ease-in-out"
            >
            <svg
             xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
            >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536L7 21H3v-4L16.732 3.732z"
           />
           </svg>
             <span>Edit</span> 
            </button>
            <button
              onClick={() => onDelete(category._id, category.name)} 
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition duration-300 ease-in-out"
            >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
            >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m2 9H7a2 2 0 01-2-2V7a2 2 0 012-2h3l1-1h4l1 1h3a2 2 0 012 2v13a2 2 0 01-2 2z"
           />
           </svg>
             <span>Delete</span> 
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
