
import React, { useReducer, useEffect, useState } from 'react';

// Initial state
const initialState = {
  newProduct: {
    name: '',
    category: '',
    price: '',
    stock: '',
    image: null,
    originalprice: '',
    productId: '',
    quantity: '',
    productDetails: '',
  },
  imagePreview: null,
  loading: false,
  error: null,
  products: [],
  searchQuery: '',
  productToEdit: null, // To store product being edited
};

// Reducer function
const productReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NEW_PRODUCT':
      return { ...state, newProduct: { ...state.newProduct, [action.name]: action.value } };
    case 'SET_IMAGE_PREVIEW':
      return { ...state, imagePreview: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_NEW_PRODUCT':
      return { ...state, newProduct: initialState.newProduct, imagePreview: null, error: null, productToEdit: null };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_PRODUCT_TO_EDIT':
      return { ...state, productToEdit: action.payload };
    default:
      return state;
  }
};

const Products = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/get');
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_PRODUCTS', payload: data });
      } else {
        console.error('Error fetching products:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_NEW_PRODUCT', name, value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: 'UPDATE_NEW_PRODUCT', name: 'image', value: file });
      dispatch({ type: 'SET_IMAGE_PREVIEW', payload: URL.createObjectURL(file) });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const formData = new FormData();
      formData.append('name', state.newProduct.name);
      formData.append('category', state.newProduct.category);
      formData.append('price', state.newProduct.price);
      formData.append('stock', state.newProduct.stock);
      formData.append('originalprice', state.newProduct.originalprice);
      formData.append('productId', state.newProduct.productId);
      formData.append('quantity', state.newProduct.quantity);
      formData.append('productDetails', state.newProduct.productDetails);

      if (state.newProduct.image) {
        formData.append('image', state.newProduct.image);
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Image file is missing' });
        return;
      }

      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product added:', data);
        dispatch({ type: 'RESET_NEW_PRODUCT' });
        fetchProducts(); // Re-fetch products after adding a new one
      } else {
        console.error('Error adding product:', await response.text());
        dispatch({ type: 'SET_ERROR', payload: 'Error adding product' });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error adding product' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/delete/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch({
          type: 'SET_PRODUCTS',
          payload: state.products.filter((product) => product._id !== productId),
        });
        console.log('Product deleted');
      } else {
        console.error('Error deleting product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const handleEditProduct = (product) => {
    dispatch({ type: 'SET_PRODUCT_TO_EDIT', payload: product });
    dispatch({
      type: 'UPDATE_NEW_PRODUCT',
      name: 'name',
      value: product.name,
    });
    dispatch({
      type: 'UPDATE_NEW_PRODUCT',
      name: 'category',
      value: product.category,
    });
    dispatch({
      type: 'UPDATE_NEW_PRODUCT',
      name: 'price',
      value: product.price,
    });
    dispatch({
      type: 'UPDATE_NEW_PRODUCT',
      name: 'stock',
      value: product.stock,
    });
    dispatch({
      type: 'UPDATE_NEW_PRODUCT',
      name: 'originalprice',
      value: product.originalprice,
    });
    dispatch({
      type: 'UPDATE_NEW_PRODUCT',
      name: 'productId',
      value: product.productId,
    });
    dispatch({
      type: 'UPDATE_NEW_PRODUCT',
      name: 'quantity',
      value: product.quantity,
    });
    dispatch({
      type: 'UPDATE_NEW_PRODUCT',
      name: 'productDetails',
      value: product.productDetails,
    });

    dispatch({
      type: 'SET_IMAGE_PREVIEW',
      payload: `http://localhost:5000${product.image}`,
    });

    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    dispatch({ type: 'RESET_NEW_PRODUCT' });
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!state.productToEdit) return;
  
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
  
    try {
      const formData = new FormData();
      formData.append('name', state.newProduct.name);
      formData.append('category', state.newProduct.category);
      formData.append('price', state.newProduct.price);
      formData.append('stock', state.newProduct.stock);
      formData.append('originalprice', state.newProduct.originalprice);
      formData.append('quantity', state.newProduct.quantity);
      formData.append('productId', state.newProduct.productId);
      formData.append('productDetails', state.newProduct.productDetails);
  
      if (state.newProduct.image instanceof File) {
        formData.append('image', state.newProduct.image);
      }
  
      const response = await fetch(`http://localhost:5000/api/products/update/${state.productToEdit._id}`, {
        method: 'PUT',
        body: formData, 
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Product updated:', data);
        fetchProducts();
        setShowEditModal(false);
        dispatch({ type: 'RESET_NEW_PRODUCT' });
      } else {
        console.error('Error updating product:', await response.text());
        dispatch({ type: 'SET_ERROR', payload: 'Error updating product' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error updating product' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
   

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = state.products.filter(
    (product) =>
      product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.productId.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 ">
      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-4">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <input
          type="text"
          name="name"
          value={state.newProduct.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="productId"
          value={state.newProduct.productId}
          onChange={handleInputChange}
          placeholder="Product ID"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={state.newProduct.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={state.newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          value={state.newProduct.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
          required
        />
        
        <input
          type="number"
          name="quantity"
          value={state.newProduct.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="originalprice"
          value={state.newProduct.originalprice}
          onChange={handleInputChange}
          placeholder="Original Price"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="productDetails"
          value={state.newProduct.productDetails}
          onChange={handleInputChange}
          placeholder="Product Details"
          className="w-full border p-2 rounded"
        />
        <input type="file" onChange={handleImageChange} className="w-full" />
        {state.imagePreview && (
          <img src={state.imagePreview} alt="Preview" className="w-32 h-32 object-cover mt-2" />
        )}
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
          disabled={state.loading}
        >
          {state.loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>

      {/* Search */}
      <input
        type="text"
        value={state.searchQuery}
        onChange={handleSearchChange}
        placeholder="Search Products"
        className="border p-2 rounded w-full mb-4"
      />

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p>Product ID: {product.productId}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Original Price: ${product.originalprice}</p>
            <p>{product.productDetails}</p>
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-10px h-32px object-cover mt-2"
            />
            <button
              onClick={() => handleEditProduct(product)}
              className="bg-yellow-500 text-white p-2 rounded-lg mt-4 w-full"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 text-white p-2 rounded-lg mt-4 w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-3/4 lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdateProduct}>
              <input
                type="text"
                name="name"
                value={state.newProduct.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full border p-2 rounded mb-4"
              />
              <input
                type="text"
                name="productId"
                value={state.newProduct.productId}
                onChange={handleInputChange}
                placeholder="Product ID"
                className="w-full border p-2 rounded mb-4"
              />
              <input
                type="text"
                name="category"
                value={state.newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="w-full border p-2 rounded mb-4"
              />
              <input
                type="number"
                name="price"
                value={state.newProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full border p-2 rounded mb-4"
              />
              <input
                type="number"
                name="originalprice"
                value={state.newProduct.originalprice}
                onChange={handleInputChange}
                placeholder="Original Price"
                className="w-full border p-2 rounded mb-4"
              />
              <input
                type="number"
                name="stock"
                value={state.newProduct.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                className="w-full border p-2 rounded mb-4"
              />

              <input
                type="number"
                name="quantity"
                value={state.newProduct.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="w-full border p-2 rounded mb-4"
              />

              <textarea
                name="productDetails"
                value={state.newProduct.productDetails}
                onChange={handleInputChange}
                placeholder="Product Details"
                className="w-full border p-2 rounded mb-4"
              />
              <input type="file" onChange={handleImageChange} className="w-full" />
              {state.imagePreview && (
                <img
                  src={state.imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg w-full"
                disabled={state.loading}
              >
                {state.loading ? 'Updating Product...' : 'Update Product'}
              </button>
            </form>
            <button
              onClick={handleModalClose}
              className="bg-gray-500 text-white p-2 rounded-lg w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
