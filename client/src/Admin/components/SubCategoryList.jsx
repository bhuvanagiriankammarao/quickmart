import React, { useState, useEffect } from "react";
import axios from "axios";

const SubCategoryList = () => {
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState(""); 
  const [editImage, setEditImage] = useState(null); 
  const [subcategoryToEdit, setSubcategoryToEdit] = useState(null);
  const [notification, setNotification] = useState("");

  // Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/subcategories"
      );
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
    const interval = setInterval(fetchSubcategories, 1000);
    return () => clearInterval(interval);
  }, []);

  const openEditModal = (subcategory) => {
    setSubcategoryToEdit(subcategory);
    setEditName(subcategory.name);
    setEditCategory(subcategory.category?._id || "");
    setEditImage(null);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("category", editCategory);

      if (editImage) {
        formData.append("image", editImage);
      }

      const response = await axios.put(
        `http://localhost:5000/api/admin/subcategories/${subcategoryToEdit._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const updatedSubcategory = response.data;

      setSubCategories((prev) =>
        prev.map((sub) =>
          sub._id === subcategoryToEdit._id ? updatedSubcategory : sub
        )
      );

      setNotification(`Subcategory "${editName}" updated successfully!`);
      setTimeout(() => setNotification(""), 3000);

      setEditModalVisible(false);
      setSubcategoryToEdit(null);
    } catch (error) {
      console.error("Error updating subcategory:", error);
      alert("Failed to update subcategory. Please try again.");
    }
  };

  // DELETE Function
  const handleDelete = async (subcategoryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/subcategories/${subcategoryId}`
      );
      setSubCategories((prev) =>
        prev.filter((sub) => sub._id !== subcategoryId)
      );
      setNotification("Subcategory deleted successfully!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      alert("Failed to delete subcategory. Please try again.");
    }
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <div className="fixed font-poppins top-4 right-4 bg-green-600 text-white py-3 px-6 rounded-xl shadow-lg">
          {notification}
        </div>
      )}

      {/* Edit Modal */}
      {editModalVisible && (
        <div className="fixed font-poppins inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Edit Subcategory
            </h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              placeholder="Enter subcategory name"
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={(e) => setEditImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              accept="image/*"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditModalVisible(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subcategories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6 font-poppins">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                {subcategory.image ? (
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {subcategory.name}
                </h2>
                <h3 className="text-sm font-medium text-gray-500">
                  Category: {subcategory.category?.name || "No Category"}
                </h3>
              </div>
            </div>
            {/* //updated buttons */}
            <div className="mt-auto flex space-x-3">
              {/* Edit Button */}
              <button
                onClick={() => openEditModal(subcategory)}
                className="flex items-center  justify-center  bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold  shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536L7 21H3v-4L16.732 3.732z"
                  />
                </svg>
                <span>Edit</span>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(subcategory._id)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
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
    </>
  );
};

export default SubCategoryList;
