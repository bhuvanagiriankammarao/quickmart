import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  addNewCategory,
  updateExistingCategory,
  removeCategory,
  clearNotification,
} from "../../store/categorySlice";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, notification } = useSelector(
    (state) => state.categories
  );

  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  }, [notification, dispatch]);

  const handleAddCategory = async (formData) => {
    setActionLoading(true);
    await dispatch(addNewCategory(formData));
    setActionLoading(false);
  };

  const handleUpdateCategory = async (id, formData) => {
    setActionLoading(true);
    await dispatch(updateExistingCategory({ id, categoryData: formData }));
    setActionLoading(false);
    closeModal();
  };

  const handleDeleteCategory = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete category "${name}"?`
    );
    if (!confirmed) return;

    setActionLoading(true);
    await dispatch(removeCategory({ id, name }));
    setActionLoading(false);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 font-poppins">
      {notification && (
        <div className="fixed top-4 right-96 bg-green-600 text-white py-3 px-6 rounded-xl shadow-lg">
          {notification}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Category Management</h1>

        <button
          onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-500 transition"
        >
          {showAddCategoryForm ? "Close Form" : "+ Add Category"}
        </button>
      </div>

      {/* Show loading spinner for actions */}
      {actionLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
          <div className="flex flex-col justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="mt-4 text-blue-500">Processing...</span>
          </div>
        </div>
      )}

      {showAddCategoryForm && (
        <CategoryForm
          onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
        />
      )}

      <CategoryList
        categories={categories}
        onDelete={handleDeleteCategory}
        onEdit={openEditModal}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <CategoryForm
              onSubmit={handleUpdateCategory}
              editingCategory={editingCategory}
            />
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
