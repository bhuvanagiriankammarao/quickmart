import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ourProducts } from '../data'; // Adjust the path as needed

const ProductDetails = () => {
  const { productId } = useParams();
  const product = ourProducts.find((item) => item.id === parseInt(productId));
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('1kg');

  if (!product) {
    return <p>Product not found!</p>;
  }

  const handleQuantityChange = (action) => {
    if (action === 'increment') setQuantity(quantity + 1);
    if (action === 'decrement' && quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex flex-wrap p-10 gap-8">
      {/* Product Images */}
      <div className="flex flex-col gap-4 w-1/3">
        <div className="flex flex-col gap-2">
          {Array.isArray(product.imageGallery) &&
            product.imageGallery.map((img, idx) => (
              <img key={idx} src={img} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
            ))}
        </div>
        <img src={product.imgURL} alt={product.name} className="w-full h-80 object-cover rounded-lg" />
      </div>

      {/* Product Details */}
      <div className="w-2/3">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-xl font-semibold text-gray-800 mt-2">Rs. {product.price}</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span key={i}>&#9733;</span> // Star icon
            ))}
          </div>
          <p className="ml-2 text-gray-500">5 Customer Reviews</p>
        </div>

        <p className="text-gray-700 mt-4">{product.ProductDetails}</p>

        {/* Variant Options */}
        <div className="flex gap-2 mt-4">
          {['500 gm', '1 kg', '2 kg'].map((variant) => (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-3 py-1 border rounded-md ${
                selectedVariant === variant ? 'border-black' : 'border-gray-300'
              }`}
            >
              {variant}
            </button>
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mt-4">
          <button onClick={() => handleQuantityChange('decrement')} className="text-2xl border p-2 rounded-md">
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button onClick={() => handleQuantityChange('increment')} className="text-2xl border p-2 rounded-md">
            +
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-md">Add To Cart</button>
        </div>

        {/* Additional Information */}
        <div className="mt-6">
          <p><span className="font-semibold">SKU:</span> SS001</p>
          <p><span className="font-semibold">Category:</span> Fruits & Vegetables</p>
          <p><span className="font-semibold">Tags:</span> Fruits, Avocado, Fresh Fruits</p>

          {/* Share Icons (Example with Font Awesome icons) */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

