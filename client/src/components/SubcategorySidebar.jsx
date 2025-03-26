import React, { useState, useEffect } from "react";
import axios from "axios";

const SubcategorySidebar = ({ selectedCategoryId, onSubcategorySelect }) => {
  const [subcategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null); 

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/subcategories/subcategories?categoryId=${categoryId}`
      );
      setSubCategories(response.data.subcategories || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setError("Failed to load subcategories. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubcategories(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
    onSubcategorySelect(subcategoryId);
  };

  return (
    <div className="sticky top-0 w-64 bg-white p-6 shadow-xl rounded-lg h-full overflow-y-auto border border-gray-200">
  <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Subcategories</h2>
  {error ? (
    <p className="text-red-500 text-sm">{error}</p>
  ) : subcategories.length === 0 ? (
    <p className="text-gray-500 text-sm">No subcategories available.</p>
  ) : (
    <div className="space-y-4">
      <button
        onClick={() => handleSubcategoryClick(null)}
        className={` w-full text-left border rounded-lg p-4 flex items-center transition duration-300 ${
          selectedSubcategoryId === null
            ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg transform scale-105"
            : "bg-gray-50 border-gray-300 hover:shadow-md hover:bg-gray-100"
        }`}
      >
        <span className="text-base font-semibold">All Products</span>
      </button>
      {subcategories.map((subcategory) => (
        <button
          key={subcategory._id}
          onClick={() => handleSubcategoryClick(subcategory._id)}
          className={`w-full text-left border rounded-lg p-4 flex items-center transition duration-300 ${
            selectedSubcategoryId === subcategory._id
              ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg transform scale-105"
              : "bg-gray-50 border-gray-300 hover:shadow-md hover:bg-gray-100"
          }`}
        >
          {subcategory.image ? (
            <img
              src={subcategory.image}
              alt={subcategory.name}
              className="w-12 h-12 object-cover rounded-lg mr-4"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-lg mr-4">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          <span className="text-base font-semibold">{subcategory.name}</span>
        </button>
      ))}
    </div>
  )}
</div>

  );
};

export default SubcategorySidebar;







