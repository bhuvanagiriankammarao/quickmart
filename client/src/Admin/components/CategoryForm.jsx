import React, { useState, useEffect } from 'react';

const CategoryForm = ({ onSubmit, editingCategory, setEditingCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setDescription(editingCategory.description);
      setImage(null); 
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('image', image);

    if (editingCategory) {
      onSubmit(editingCategory._id, formData);
    } else {
      onSubmit(formData);
    }

    // Reset form
    setName('');
    setDescription('');
    setImage(null);
    setEditingCategory(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6  mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {editingCategory ? 'Edit Category' : 'Add New Category'}
      </h2>

      <label className="block mb-2 text-gray-600 font-medium">Category Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter category name"
        required
        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
      />

      <label className="block mb-2 text-gray-600 font-medium">Upload Image</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full text-gray-600 bg-white border border-gray-300 rounded px-4 py-2 mb-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        type="submit"
        className="bg-green-500 text-white font-medium px-4 py-2 rounded w-full hover:bg-green-600 transition duration-300"
      >
        {editingCategory ? 'Update Category' : 'Add Category'}
      </button>
    </form>
  );
};

export default CategoryForm;
