import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  // const wishlist = useSelector((state) => state.wishlist); 
  const wishlist = useSelector((state) => state.wishlist.items);

   
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState({ visible: false, productName: '' });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const isWishlisted = wishlist.some((item) => item.productId === product.productId);

  const handleWishlist = () => {
    const wishlistItem = { ...product, imgURL: product.image };
    if (isWishlisted) {
      dispatch(removeFromWishlist(wishlistItem));
    } else {
      dispatch(addToWishlist(wishlistItem));
    }
  };

  const addToCart = () => {
    dispatch(add(product));
    showNotification(product.name);
  };

  const showNotification = (productName) => {
    setNotification({ visible: true, productName });
    setTimeout(() => setNotification({ visible: false, productName: '' }), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 
    font-poppins pt-28">
      {/* Image section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col space-y-4">
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
          <div className="flex gap-4">
            <img src={product.image} alt="Variant" className="w-20 h-20 object-cover rounded-lg border" />
            <img src={product.image} alt="Variant" className="w-20 h-20 object-cover rounded-lg border" />
            <img src={product.image} alt="Variant" className="w-20 h-20 object-cover rounded-lg border" />
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-gray-600">{product.productDetails}</p>
        <div className=' flex space-x-3 items-center '>
        <p className="text-2xl font-bold text-gray-900">Rs. {product.price}</p>
        <p className="text-xl  text-gray-500 line-through">Rs. {product.originalprice}</p>

        </div>
        
        <div className="flex space-x-4 ">
          <button
            onClick={addToCart}
            className="  px-6 py-3  shadow
             hover:bg-orange-600 transition-all 
             text-white font-semibold mb-4 bg-orangeCustom w-40 h-12 rounded-lg
              group-hover:opacity-100 "
          >
            Add to Cart
          </button>
          <button
            onClick={handleWishlist}
            className={`flex items-center space-x-2 ${
              isWishlisted ? 'text-red-500' : 'text-gray-500'
            } hover:text-red-600 transition-all`}
          >
            <FaHeart />
            <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
          </button>
        </div>
        <div className="pt-4">
          <span className="font-semibold">Share:</span>
          <div className="flex space-x-4 mt-2">
            <FaFacebook className="text-blue-600 cursor-pointer hover:text-blue-800" />
            <FaTwitter className="text-blue-400 cursor-pointer hover:text-blue-600" />
            <FaInstagram className="text-pink-500 cursor-pointer hover:text-pink-700" />
          </div>
        </div>
      </div>
      {notification.visible && (
        <div className="fixed top-4 right-1/3 bg-green-600 text-white py-3 px-6 rounded-xl shadow-lg text-lg font-bold animate-slide-down">
          <p className="flex items-center gap-2">
            <BsFillCartCheckFill className="animate-pulse" />
            {notification.productName} added to cart!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

