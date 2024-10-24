import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);

  // Calculate the total amount for the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between p-4 border rounded-lg items-center">
              {/* Product Info */}
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="bg-gray-300 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="bg-gray-300 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>

              {/* Total Price for This Product */}
              <p className="text-lg font-bold">
                ${ (item.price * item.quantity).toFixed(2) }
              </p>

              {/* Remove Item */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total: ${calculateTotal()}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
