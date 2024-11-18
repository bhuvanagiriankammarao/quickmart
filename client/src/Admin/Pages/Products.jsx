import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { productsData } from '../../data/index';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    image: null,
    quantity: '',           
    originalPrice: '',       
    productDetails: '', 
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const [notification, setNotification] = useState({
    message: '',
    visible: false
  });
  
  const showNotification = (productName) => {
    setNotification({ message: `New product added: ${productName}`, visible: true });
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: '', visible: false });
    }, 3000);
  };

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
    setProducts([...products, { 
      ...newProduct, 
      price: parseFloat(newProduct.price),
      image: imagePreview,
    }]);
    showNotification(newProduct.name); // Show styled notification with the product name
    resetForm();
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setNewProduct(productToEdit);
    setImagePreview(productToEdit.image);
    setCurrentProductId(id);
    setShowEditModal(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(product => 
      product.id === currentProductId ? { ...newProduct, price: parseFloat(newProduct.price), image: imagePreview } : product
    ));

    setNotification({
      visible: true,
      message: `Product "${newProduct.name}" updated successfully!`,
    });


    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 3000);


    resetForm();
    setShowEditModal(false);
  };

  const resetForm = () => {
    setNewProduct({ id: '', name: '', category: '', price: '', stock: '', image: null,
      quantity: '', originalPrice: '', productDetails: '' 
     });
    setImagePreview(null);
    setShowAddProductForm(false);
  };

  // const handleDeleteProduct = (id) => {
  //   setProducts(products.filter((product) => product.id !== id));
    
  // };


  const handleDeleteProduct = (id) => {
    const productToDelete = products.find((product) => product.id === id);
  
    setProducts(products.filter((product) => product.id !== id));
  
    setNotification({
      visible: true,
      message: `Product "${productToDelete.name}" deleted successfully!`,
    });
  
    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 3000);
  };
  

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'All') {
      return matchesSearch;
    } else if (activeTab === 'Low Stock') {
      return matchesSearch && product.stock > 0 && product.stock <= 10;
    } else if (activeTab === 'Out of Stock') {
      return matchesSearch && product.stock === 0;
    } else if (activeTab === 'In Stock') {
      return matchesSearch && product.stock > 10;
    }
    return false;
  });

return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <div className="flex justify-between items-center mb-6">
      {notification.visible && (
  <div className="fixed top-4 right-[28rem] bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-xl shadow-xl flex items-center space-x-3 transition-transform transform-gpu duration-300 ease-out animate-bounce">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M3 3h2l.4 2M7 13h10l3-8H6.4L5.2 5H3m4 12a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
    <span className="font-semibold">{notification.message}</span>
  </div>
)}


        <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          onClick={() => setShowAddProductForm(!showAddProductForm)}
        >
          + Add Product
        </button>
      </div>

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
              className="p-2 border rounded-md"
            />

<input
      type="text"
      name="quantity"
      placeholder="Quantity"
      value={newProduct.quantity}
      onChange={handleInputChange}
      required
      className="p-2 border rounded-md"
    />
    <input
      type="number"
      name="originalPrice"
      placeholder="Original Price"
      value={newProduct.originalPrice}
      onChange={handleInputChange}
      required
      className="p-2 border rounded-md"
    />
    <textarea
      name="productDetails"
      placeholder="Product Details"
      value={newProduct.productDetails}
      onChange={handleInputChange}
      required
      className="p-2 border rounded-md"
    ></textarea>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add Product
          </button>
          <button
        type="button"
        onClick={resetForm}
        className="bg-red-600 text-white py-2 px-8  ml-24 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Cancel
      </button>
        </form>
      )}

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded-md w-full"
      />

      <div className="mb-4 flex space-x-4">
        {['All', 'Low Stock', 'Out of Stock', 'In Stock'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
          <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="py-3 px-4 border-b">Rs.{Number(product.price).toFixed(2)}</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="text-blue-600 hover:underline"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-600 hover:underline ml-2"
                >
                  <FaTrashAlt size={20}/> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Popup open={showEditModal} onClose={() => setShowEditModal(false)}>
  <div className="p-4 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold">Edit Product</h2>
    <form onSubmit={handleUpdateProduct}>
      <div className="grid grid-cols-2 gap-4">
        
        <label className="text-gray-600 font-semibold">
          Product ID
          <input
            type="text"
            name="id"
            placeholder="Product ID"
            value={newProduct.id}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-md w-full mt-1 text-black"
          />
        </label>
        
        <label className="text-gray-600 font-semibold">
          Product Name
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-md w-full mt-1 text-black"
          />
        </label>

        <label className="text-gray-600 font-semibold">
          Category
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-md w-full mt-1 text-black"
          />
        </label>

        <label className="text-gray-600 font-semibold">
          Price
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-md w-full mt-1 text-black"
          />
        </label>

        <label className="text-gray-600 font-semibold">
          Stock
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-md w-full mt-1 text-black"
          />
        </label>

        <label className="text-gray-600 font-semibold">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="p-2 border rounded-md w-full mt-1 text-black"
          />
        </label>

        <label className="text-gray-600 font-semibold">
          Quantity
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-md w-full mt-1 text-black"
          />
        </label>

        <label className="text-gray-600 font-semibold">
          Original Price
          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={newProduct.originalPrice}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-md w-full mt-1 text-black"
          />
        </label>

        <label className="text-gray-600 font-semibold col-span-2">
          Product Details
          <textarea
            name="productDetails"
            placeholder="Product Details"
            value={newProduct.productDetails}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-md w-full mt-1 text-black"
          ></textarea>
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Update Product
      </button>
      <button
        type="button"
        onClick={() => setShowEditModal(false)}
        className="bg-gray-300 text-gray-800 py-2 px-4 ml-28 rounded-lg hover:bg-gray-400 transition duration-300"
      >
        Cancel
      </button>
    </form>
  </div>
</Popup>

    </div>
  );
};

export default Products;