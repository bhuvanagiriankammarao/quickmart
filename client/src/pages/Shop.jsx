import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Shop = () => {
  const { addToCart } = useContext(CartContext);

  // Sample products data
  const products = [
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 49.99 },
    { id: 3, name: 'Product 3', price: 19.99 },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
