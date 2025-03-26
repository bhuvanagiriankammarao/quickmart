import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = ({
  onAddProduct,
  loading,
  error,
  imagePreview,
  setImagePreview,
  product,
  handleInputChange,
  handleImageChange,
  categories,
  subcategories,
  handleCategoryChange,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(e);
  };
  const [state, setState] = useState({
    newProduct: {
      productId: "",
      name: "",
      category: "",
      subCategory: "",
      price: "",
      stock: "",
      originalprice: "",
      quantity: "",
      productDetails: "",
      image: null,
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white shadow-md rounded-lg "
    >
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select a Category</option>
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>

        <select
          name="subCategory"
          value={product.subCategory || ""}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select a Subcategory</option>
          {subcategories && subcategories.length > 0 ? (
            subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No subcategories available
            </option>
          )}
        </select>

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="originalprice"
          value={product.originalprice}
          onChange={handleInputChange}
          placeholder="Original Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="quantity"
          value={product.quantity || ""}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="productDetails"
          value={product.productDetails}
          onChange={handleInputChange}
          placeholder="Product Details"
          className="w-full border p-2 rounded"
        ></textarea>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2"
          />
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 my-4 flex justify-center items-center space-x-2 rounded-lg transition ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
        } text-white shadow-md hover:shadow-lg transform hover:scale-100 focus:outline-none`}
      >
        {loading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v3.25A4.75 4.75 0 007.25 12H4z"
              ></path>
            </svg>
            <span>Adding...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Add Product</span>
          </>
        )}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
};

export default AddProduct;
