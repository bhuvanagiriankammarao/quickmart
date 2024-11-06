import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { categoryData } from '../data/index'; 

const Categories = () => {
  // Use imported data as the initial state
  const [categories, setCategories] = useState(categoryData);
  const [newCategory, setNewCategory] = useState({
    name: '',
    sold: '',
    stock: '',
    added: new Date().toLocaleDateString(),
  });
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

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
    setNewCategory({ name: '', sold: '', stock: '', added: new Date().toLocaleDateString() });
    setShowAddCategoryForm(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
                  <button className="text-blue-600 hover:text-blue-800 px-3 py-1">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 px-3 py-1"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
