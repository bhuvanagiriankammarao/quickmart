import React, { useReducer, useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import AddProduct from '../components/AddProduct';
import EditProductModal from '../components/EditProductModal';
import { getCategories } from "../api/api";

// Initial state
const initialState = {
  newProduct: {
    name: '',
    category: '',
    subCategory: '',
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
  productToEdit: null,
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
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [productToPreview, setProductToPreview] = useState(null);
  const [notification, setNotification] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 32; // Adjust the number of products per page as needed


  const filteredProducts = state.products.filter(
  (product) =>
    product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    product.productId.toLowerCase().includes(state.searchQuery.toLowerCase())
   );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
  );

    // Scroll to the top of the window
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    // Handle navigation to the previous page
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        scrollToTop();
      }
    };
  
    // Handle navigation to the next page
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        scrollToTop();
      }
    };
  
    // Change page when clicking a specific number
    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
      scrollToTop();
    };


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
    console.log(`Input change - ${name}: ${value}`); 
    dispatch({ type: 'UPDATE_NEW_PRODUCT', name, value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: 'UPDATE_NEW_PRODUCT', name: 'image', value: file });
      dispatch({ type: 'SET_IMAGE_PREVIEW', payload: URL.createObjectURL(file) });
    }
  };

  useEffect(() => {
    console.log("Updated state:", state.newProduct);
}, [state.newProduct.subCategory]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    // Generate the new product ID
    const existingIds = state.products
      .map((product) => product.productId)
      .filter((id) => id.startsWith('PROD-'))
      .map((id) => parseInt(id.split('-')[1], 10));

    const newIdNumber = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    const newProductId = `PROD-${String(newIdNumber).padStart(2, '0')}`;

    // Set the new productId in the state
    dispatch({ type: 'UPDATE_NEW_PRODUCT', name: 'productId', value: newProductId });

    try {
      const formData = new FormData();
      formData.append('productId', newProductId);
      formData.append('name', state.newProduct.name);
      formData.append('category', state.newProduct.category);
      formData.append('subCategory', state.newProduct.subCategory);
      formData.append('price', state.newProduct.price);
      formData.append('stock', state.newProduct.stock);
      formData.append('originalprice', state.newProduct.originalprice);
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
        setNotification(`Product "${state.newProduct.name}" added successfully!`);
        dispatch({ type: 'RESET_NEW_PRODUCT' });
        fetchProducts();
        setTimeout(() => setNotification(''), 3000);
      } else {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          console.error('Error adding product:', errorJson);
          dispatch({ type: 'SET_ERROR', payload: errorJson.message || 'Error adding product' });
        } catch (e) {
          console.error('Error adding product:', errorText);
          dispatch({ type: 'SET_ERROR', payload: errorText || 'Error adding product' });
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Error adding product' });
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
        setNotification(`Product deleted successfully!`);
        setTimeout(() => setNotification(''), 3000);
        console.log('Product deleted');
      } else {
        console.error('Error deleting product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product) => {
    dispatch({ type: 'SET_PRODUCT_TO_EDIT', payload: product });
    Object.keys(product).forEach((key) => {
      dispatch({ type: 'UPDATE_NEW_PRODUCT', name: key, value: product[key] });
    });
    dispatch({
      type: 'SET_IMAGE_PREVIEW',
      payload: product.image.includes('http') ? product.image : `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${product.image}`,
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

    try {
      const formData = new FormData();
      Object.entries(state.newProduct).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(
        `http://localhost:5000/api/products/update/${state.productToEdit._id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (response.ok) {
        await fetchProducts();
        setShowEditModal(false);
        dispatch({ type: 'RESET_NEW_PRODUCT' });
        setNotification(`Product "${state.newProduct.name}" updated successfully!`);
        setTimeout(() => setNotification(''), 3000);
      } else {
        const errorText = await response.text();
        console.error('Error updating product:', errorText);
        dispatch({ type: 'SET_ERROR', payload: errorText });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePreviewProduct = (product) => {
    console.log("Previewing product:", product);
    setProductToPreview(product);
    setShowPreviewModal(true);
  };

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
   
    // Update the category
    dispatch({ type: 'UPDATE_NEW_PRODUCT', name: 'category', value: selectedCategoryId });

    // Reset subCategory to an empty value
    if (state.newProduct.subCategory) {
      dispatch({ type: 'UPDATE_NEW_PRODUCT', name: 'subCategory', value: '' });
    }
    // dispatch({ type: 'UPDATE_NEW_PRODUCT', name: 'subCategory', value: '' });

    if (selectedCategoryId) {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/subcategories/subcategories?categoryId=${selectedCategoryId}`);
            
            const data = await response.json();
            setSubcategories(data.subcategories || []);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            setSubcategories([]);
        }
    } else {
        setSubcategories([]);
    }
};
  return (
    <div className="container mx-auto p-4 font-poppins">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        {notification && (
          <div className="fixed top-4 right-96 bg-green-600 text-white py-3 px-6 rounded-xl shadow-lg">
            {notification}
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
        <button
          onClick={() => setShowAddProductForm(!showAddProductForm)}
          className="mb-4 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-purple-500 transition"
        >
          {showAddProductForm ? 'Close Form' : ' + Add Product'}
        </button>
      </div>
      {showAddProductForm && (
        <AddProduct
          onAddProduct={handleAddProduct}
          loading={state.loading}
          error={state.error}
          imagePreview={state.imagePreview}
          setImagePreview={(url) => dispatch({ type: "SET_IMAGE_PREVIEW", payload: url })}
          product={state.newProduct}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          categories={categories}
          subcategories={subcategories}
          handleCategoryChange={handleCategoryChange}
        />
      )}
      <input
        type="text"
        placeholder="Search..."
        value={state.searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded-md w-full"
      />
      <div className="overflow-x-auto">
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
            {currentProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{product.productId}</td>
                <td className="border px-4 py-2">
                  <img
                  src={product.image || 'default-image-path'}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"/>
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category?.name}</td>
                <td className="border px-4 py-2"><span className='font-semibold'>RS.</span>{product.price}</td>
                <td className={`border px-4 py-2 ${product.stock < 5 ? "text-red-500 font-bold" : ""}`}>{product.stock}</td>
                <td className="p-4 border-b">
                  <div className="flex space-x-4">
                    <button onClick={() => handleEditProduct(product)} className="text-blue-600">
                      <FaEdit />
                    </button>
                    <button className="text-red-500" onClick={() => handleDeleteProduct(product._id)}>
                      <FaTrashAlt />
                    </button>
                    <button className="text-green-500" onClick={() => handlePreviewProduct(product)}>
                      <FaEye />
                    </button>
                  </div>
                </td>
             </tr>
            ))}
          </tbody>
        </table>
        <Popup open={showEditModal} onClose={() => setShowEditModal(false)}>
        <EditProductModal
        showModal={showEditModal}
        onClose={handleModalClose}
        product={state.newProduct}
        imagePreview={state.imagePreview}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        onUpdate={handleUpdateProduct}
        loading={state.loading}
        categories={categories}
        handleInputChange={handleInputChange}
        subcategories={subcategories}
        handleCategoryChange={handleCategoryChange}
        />
       </Popup>

        {productToPreview && (
          // <Popup open={showPreviewModal} onClose={() => setShowPreviewModal(false)}>
          //   <div className="p-6 bg-white shadow-lg rounded-xl max-h-[90vh]  w-full
          //    overflow-y-auto relative font-poppins">
          //     <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">
          //       Product Details
          //     </h2>
          //     <div className="space-y-4">
          //       <p>
          //         <span className="font-medium text-gray-700">ID:</span>{" "}
          //         <span className="text-gray-600">{productToPreview.productId || 'N/A'}</span>
          //       </p>
          //       <p>
          //         <span className="font-medium text-gray-700">Name:</span>{" "}
          //         <span className="text-gray-600">{productToPreview.name || 'N/A'}</span>
          //       </p>
          //       <p>
          //         <span className="font-medium text-gray-700">Category:</span>{" "}
          //         <span className="text-gray-600">{productToPreview.category?.name || 'N/A'}</span>
          //       </p>
          //       <p>
          //         <span className="font-medium text-gray-700">Subcategory:</span>{" "}
          //         <span className="text-gray-600">{ productToPreview.subCategory?.name || 'N/A'}</span>
          //       </p>
          //       <p>
          //         <span className="font-medium text-gray-700">Price:</span>{" "}
          //         <span className="text-gray-600">RS.{productToPreview.price || 'N/A'}</span>
          //       </p>
          //       <p>
          //         <span className="font-medium text-gray-700">Original Price:</span>{" "}
          //         <span className="text-gray-600">RS.{productToPreview.originalprice || 'N/A'}</span>
          //       </p>
          //       <p>
          //         <span className="font-medium text-gray-700">Stock:</span>{" "}
          //         <span className="text-gray-600">{productToPreview.stock || 'N/A'}</span>
          //       </p>
          //       <p>
          //         <span className="font-medium text-gray-700">Quantity:</span>{" "}
          //         <span className="text-gray-600">{productToPreview.quantity || 'N/A'}</span>
          //       </p>
          //       <p>
          //         <span className="font-medium text-gray-700">Details:</span>{" "}
          //         <span className="text-gray-600">{productToPreview.productDetails || 'N/A'}</span>
          //       </p>
          //     </div>
          //     <div className="mt-6">
          //       <img
          //         src={productToPreview.image || 'https://via.placeholder.com/150'}
          //         alt={productToPreview.name || 'Product Image'}
          //         className="w-48 h-48 object-cover rounded-lg shadow-md"
          //       />
          //     </div>
          //     <button
          //       onClick={() => setShowPreviewModal(false)}
          //       className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          //     >
          //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          //         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          //       </svg>
          //     </button>
          //     <button
          //       onClick={() => setShowPreviewModal(false)}
          //       className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          //     >
          //       Close
          //     </button>
          //   </div>
          // </Popup>
          <Popup open={showPreviewModal} onClose={() => setShowPreviewModal(false)}>
  <div className="p-8 bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl 
  max-h-[85vh] max-w-2xl w-full overflow-y-auto relative font-poppins border
   border-gray-300 ">

    {/* Close Button */}
    <button
      onClick={() => setShowPreviewModal(false)}
      className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-300 rounded-full p-2 shadow-md transition duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* Header with Subtle Glow */}
    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 pb-3 drop-shadow-md">
      Product Details
    </h2>

    {/* Product Info Grid */}
    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-800 text-lg">
      <p><span className="font-semibold text-gray-600">ID:</span> {productToPreview.productId || 'N/A'}</p>
      <p><span className="font-semibold text-gray-600">Name:</span> {productToPreview.name || 'N/A'}</p>
      <p><span className="font-semibold text-gray-600">Category:</span> {productToPreview.category?.name || 'N/A'}</p>
      <p><span className="font-semibold text-gray-600">Subcategory:</span> {productToPreview.subCategory?.name || 'N/A'}</p>
      <p><span className="font-semibold text-gray-600">Price:</span> <span className="text-green-600 font-bold">RS.{productToPreview.price || 'N/A'}</span></p>
      <p><span className="font-semibold text-gray-600">Original Price:</span> <span className="text-red-500 font-bold line-through">RS.{productToPreview.originalprice || 'N/A'}</span></p>
      <p><span className="font-semibold text-gray-600">Stock:</span> {productToPreview.stock || 'N/A'}</p>
      <p><span className="font-semibold text-gray-600">Quantity:</span> {productToPreview.quantity || 'N/A'}</p>
    </div>

    {/* Product Details */}
    <p className="mt-6 text-gray-700 text-lg leading-relaxed">
      <span className="font-semibold text-gray-600">Details:</span> {productToPreview.productDetails || 'N/A'}
    </p>

    {/* Image with Hover Zoom Effect */}
    <div className="mt-6 flex justify-center">
      <div className="relative group">
        <img
          src={productToPreview.image || 'https://via.placeholder.com/300'}
          alt={productToPreview.name || 'Product Image'}
          className="w-48 h-48 object-cover rounded-xl shadow-lg border border-gray-200 transition-transform duration-300 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>

    {/* Buttons with Neon Glow Effect */}
    <div className="mt-6 flex gap-4">
      <button
        onClick={() => setShowPreviewModal(false)}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-700 text-white font-semibold text-lg shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition duration-300"
      >
        Close
      </button>

    </div>

  </div>
</Popup>

        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-100'}`}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
        <button
        key={index + 1}
        onClick={() => handlePageClick(index + 1)}
        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`} >
          {index + 1}
        </button>
      ))}
      <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-100'}`}
  >
    Next
  </button>
</div>

    </div>
  );
};

export default Products;