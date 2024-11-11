import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { categoryData } from '../../data/index';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Categories = () => {
  const [categories, setCategories] = useState(categoryData);
  const [newCategory, setNewCategory] = useState({
    name: '',
    sold: '',
    stock: '',
    added: new Date().toLocaleDateString(),
  });
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [notification, setNotification] = useState({ visible: false, message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    setCategories([
      ...categories,
      { ...newCategory, id: categories.length + 1 },
    ]);
    setNotification({ visible: true, message: `Category '${newCategory.name}' added successfully!` });
    setNewCategory({ name: '', sold: '', stock: '', added: new Date().toLocaleDateString() });
    setShowAddCategoryForm(false);
    hideNotification();
  };

  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find(category => category.id === id);
    setNewCategory(categoryToEdit);
    setCurrentCategoryId(id);
    setShowEditModal(true);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    setCategories(categories.map(category => 
      category.id === currentCategoryId ? { ...newCategory, id: currentCategoryId } : category
    ));
    setNotification({ visible: true, message: `Category '${newCategory.name}' updated successfully!` });
    setShowEditModal(false);
    hideNotification();
  };

  const handleDeleteCategory = (id) => {
    const deletedCategory = categories.find((category) => category.id === id);
    setCategories(categories.filter((category) => category.id !== id));
    setNotification({ visible: true, message: `Category '${deletedCategory.name}' deleted successfully!` });
    hideNotification();
  };

  const hideNotification = () => {
    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 3000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
        >
          + Add Category
        </button>
      </div>

      {showAddCategoryForm && (
        <form onSubmit={handleAddCategory} className="mb-6 p-4 bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={handleInputChange}
              required
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              name="sold"
              placeholder="Sold Quantity"
              value={newCategory.sold}
              onChange={handleInputChange}
              required
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={newCategory.stock}
              onChange={handleInputChange}
              required
              className="p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Category
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b-2 text-left">Category Name</th>
              <th className="py-3 px-4 border-b-2 text-left">Sold</th>
              <th className="py-3 px-4 border-b-2 text-left">Stock</th>
              <th className="py-3 px-4 border-b-2 text-left">Added</th>
              <th className="py-3 px-4 border-b-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{category.name}</td>
                <td className="py-3 px-4 border-b">{category.sold}</td>
                <td className="py-3 px-4 border-b">{category.stock}</td>
                <td className="py-3 px-4 border-b">{category.added}</td>
                <td className="py-3 px-4 border-b text-center">
                  <button
                    onClick={() => handleEditCategory(category.id)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Popup open={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold">Edit Category</h2>
          <form onSubmit={handleUpdateCategory}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={handleInputChange}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                name="sold"
                placeholder="Sold Quantity"
                value={newCategory.sold}
                onChange={handleInputChange}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={newCategory.stock}
                onChange={handleInputChange}
                required
                className="p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Category
            </button>
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="bg-gray-300 text-gray-800 py-2 px-4 ml-4 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </form>
        </div>
      </Popup>

      {notification.visible && (
        <div className="fixed top-4 right-[26rem] items-center bg-gradient-to-r
         from-green-400 to-green-600 text-white py-3 px-6 rounded-xl shadow-xl
          flex  space-x-3 transition-transform transform-gpu duration-300 ease-out animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 4h-5.586l-2-2H7v5.586L5 9.586V20h14V4z" />
          </svg>
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default Categories;
