import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, increment, decrement } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import CartBanner from '../../section/Cart/CartBAnner';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = (product) => {
    dispatch(remove(product));
  };

  const incrementQuantity = (product) => {
    dispatch(increment(product));
  };

  const decrementQuantity = (product) => {
    dispatch(decrement(product));
  };

  const totalAmount = cartItems.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  return (
    <div>
      <CartBanner />
      <div className="container mx-auto p-8">
      
      <h2 className="text-3xl font-bold mb-6 text-center">Cart</h2>
      <div className="flex justify-between items-start gap-8">
        <div className="w-3/4">
          <div className="grid grid-cols-4 bg-gray-200 p-4 rounded-t-lg font-semibold text-gray-700">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          {cartItems.length === 0 ? (
            <p className="p-4">Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 items-center p-4 border-b border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imgURL}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <span className="text-lg font-medium">{item.name}</span>
                </div>
                <p className="text-gray-600">Rs. {item.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decrementQuantity(item)}
                    className="px-2 py-1 bg-gray-300 rounded-l-lg text-black"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item)}
                    className="px-2 py-1 bg-gray-300 rounded-r-lg text-black"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-600">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <div className="w-1/4 p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>Rs. {totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>Rs. {totalAmount.toFixed(2)}</p>
          </div>
          <Link to="/payment">
            <button className="w-full mt-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
              Check Out
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Cart;
