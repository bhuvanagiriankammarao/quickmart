import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { productsData } from '../data';

const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [filter, setFilter] = useState('All'); // Add filter state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    // Add the new product with a placeholder image URL
    setProducts([...products, { 
      ...newProduct, 
      price: parseFloat(newProduct.price),
      image: imagePreview,  // Replace this with actual upload URL in a production app
    }]);

    setNewProduct({ id: '', name: '', category: '', price: '', stock: '', image: null });
    setImagePreview(null);
    setShowAddProductForm(false); // Hide the form after adding the product
  };

  // const filteredProducts = products.filter(
  //   (product) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };


  // Filter products based on the selected filter and search term
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'All') {
      return matchesSearch;
    } else if (filter === 'Low Stock') {
      return matchesSearch && product.stock > 0 && product.stock <= 10;
    } else if (filter === 'Out of Stock') {
      return matchesSearch && product.stock === 0;
    } else if (filter === 'Stock') {
      return matchesSearch && product.stock > 10;
    }
    return false;
  });


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          onClick={() => setShowAddProductForm(!showAddProductForm)}
        >
          + Add Product
        </button>
      </div>

      {/* Conditionally render the Add Product Form */}
      {showAddProductForm && (
        <form onSubmit={handleAddProduct} className="mb-6 p-4 bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="id"
              placeholder="Product ID"
              value={newProduct.id}
              onChange={handleInputChange}
              required
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              required
              className="p-2 border rounded-md"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
              className="p-2 border rounded-md"
            />
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Product Preview" className="h-20 w-20 object-cover rounded" />
            </div>
          )}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </form>
      )}

<div className="flex space-x-4 mb-6">
        {['All', 'Stock', 'Low Stock', 'Out of Stock'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`py-2 px-4 rounded-md ${
              filter === tab ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
            } transition duration-300`}
          >
            {tab}
          </button>
        ))}
      </div>


      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name or Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b-2 text-left">Product</th>
              <th className="py-3 px-4 border-b-2 text-left">ID</th>
              <th className="py-3 px-4 border-b-2 text-left">Category</th>
              <th className="py-3 px-4 border-b-2 text-left">Stock</th>
              <th className="py-3 px-4 border-b-2 text-left">Price</th>
              <th className="py-3 px-4 border-b-2 text-left">Status</th>
              <th className="py-3 px-4 border-b-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b flex items-center">
                  <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded mr-4" />
                  {product.name}
                </td>
                <td className="py-3 px-4 border-b">{product.id}</td>
                <td className="py-3 px-4 border-b">{product.category}</td>
                <td className="py-3 px-4 border-b">{product.stock}</td>
                <td className="py-3 px-4 border-b">Rs.{Number(product.price).toFixed(2)}</td>
                <td className="py-3 px-4 border-b">
                  {product.stock > 10 ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 
                    rounded-full text-xs">Stock</span>
                  ) : product.stock > 0 ? (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Low Stock</span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full
                    text-xs">Out of Stock</span>
                  )}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <button className="text-blue-600 hover:text-blue-800 px-3 py-1">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 px-3 py-1"
                    onClick={() => handleDeleteProduct(product.id)}
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

export default Products;


