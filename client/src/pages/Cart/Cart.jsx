import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, increment, decrement, setCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import CartBanner from "../../section/Cart/CartBanner";
import axios from "axios";
import { auth } from "../../firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth"; 

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/cart/${userEmail}`)
        .then((response) => {
          dispatch(setCart(response.data));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          setLoading(false);
        });
    }
  }, [userEmail, dispatch]);

  const addToCart = (product) => {
    if (!userEmail) {
      alert("Please log in to add items to the cart.");
      return;
    }
    dispatch(add(product));
    axios.post("http://localhost:5000/api/cart/add", { ...product, email: userEmail });
  };

  // Remove product from cart & sync with backend
  const removeFromCart = (product) => {
    dispatch(remove(product));
    axios.post("http://localhost:5000/api/cart/remove", { email: userEmail, productId: product.productId });
  };

  // Increment product quantity & sync with backend
  const incrementQuantity = (product) => {
    dispatch(increment(product));
    axios.post("http://localhost:5000/api/cart/add", { ...product, email: userEmail });
  };

  // Decrement product quantity & sync with backend
  const decrementQuantity = (product) => {
    dispatch(decrement(product));
    axios.post("http://localhost:5000/api/cart/remove", { email: userEmail, productId: product.productId });
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  // Handle checkout process with Razorpay integration
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!userEmail) {
      alert("Please log in to proceed with the checkout.");
      return;
    }
    setLoading(true);
    try {
      // Step 1: Create a Razorpay order
      const { data: order } = await axios.post(
        "http://localhost:5000/api/create-razorpay-order",
        { amount: totalAmount * 1.00 } // Amount in paisa
      );

      const options = {
        key: "rzp_test_GsUAh2atNEW2CJ", // Your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "QuickMart Checkout",
        description: "Complete your payment",
        handler: async (response) => {
          try {
            // Step 2: Verify payment and save order details
            const verification = await axios.post(
              "http://localhost:5000/api/verify-razorpay-payment",
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderDetails: cartItems.map((item) => ({
                  productName: item.name,
                  productImage: item.imgURL,
                  quantity: item.quantity,
                  price: item.price,
                })),
                totalAmount,
                userEmail,
                userName: "User", 
              }
            );
            if (verification.data.success) {
              await axios.post("http://localhost:5000/api/cart/clear", { email: userEmail });
              // Clear the Redux store cart
              dispatch(setCart([]));
              navigate("/orderplaced");
            } else {
              alert("Payment verification failed!");
            }
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert("An error occurred while verifying the payment.");
          }
        },
        prefill: {
          name: "User", 
          email: userEmail,
          contact: "1234567890", 
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
//     <div className=" pt-20">
//       <CartBanner />
//       <div className="container mx-auto p-4 md:p-8 font-poppins">
//         {/* <h2 className="text-3xl font-bold mb-6 text-center">Cart</h2> */}
//         <div className="flex justify-between items-start gap-8" >
//           <div className="w-3/4">
//             <div className="hidden md:grid grid-cols-4 bg-gray-200 p-4 rounded-t-lg 
// font-semibold text-gray-700">
//               <p>Product</p>
//               <p>Price</p>
//               <p>Quantity</p>
//               <p>Subtotal</p>
//             </div>
//             {cartItems.length === 0 ? (
//               <p className="p-4 text-center">Your cart is empty</p>
//             ) : (
//               cartItems.map((item, index) => (
//                 <div
//                   key={item.productId || index}
//                   className="grid grid-cols-1 md:grid-cols-4 items-center p-4 border-b border-gray-200 gap-4"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={item.imgURL}
//                       alt={item.name}
//                       className="w-16 h-16 md:w-16 md:h-16 object-cover rounded-lg"
//                     />
//                     <span className="text-base font-medium break-words">{item.name}</span>
//                   </div>
//                   <p className="text-gray-600">Rs. {parseFloat(item.price).toFixed(2)}</p>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => decrementQuantity(item)}
//                       className="px-2 py-1 bg-gray-300 rounded-l-lg text-black"
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-1 border">{item.quantity}</span>
//                     <button
//                       onClick={() => incrementQuantity(item)}
//                       className="px-2 py-1 bg-gray-300 rounded-r-lg text-black"
//                     >
//                       +
//                     </button>
                  
//                   </div>
                  
//                   <p className="text-gray-600">
//                     Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}
//                   </p>
                  
//                   <button
//                     onClick={() => removeFromCart(item)}
//                     className="text-red-500 hover:text-red-700 text-xl"
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="w-1/4 p-4 bg-gray-50 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
//             <div className="flex justify-between mb-2">
//               <p>Subtotal</p>
//               <p>Rs. {totalAmount.toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between font-bold text-lg">
//               <p>Total</p>
//               <p>Rs. {totalAmount.toFixed(2)}</p>
//             </div>
//             <button
//               onClick={handleCheckout}
//               disabled={cartItems.length === 0 || loading}
//               className={`w-full mt-6 px-4 py-2 rounded-lg ${
//                 loading
//                   ? "bg-gray-500 cursor-not-allowed"
//                   : "bg-gray-800 hover:bg-gray-900 text-white"
//               }`}
//             >
//               {loading ? "Processing..." : "Check Out"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
<div className="pt-20">
  <div className="hidden sm:block">
  <CartBanner />
  </div>
  
  {/* <div className="container mx-auto p-4 md:p-8 font-poppins">
    <div className="flex flex-col md:flex-row justify-between gap-8">
      
      
      <div className="w-full md:w-3/4">
        <table className="w-full border-collapse hidden md:table">
          <thead>
            <tr className="bg-beige-200  rounded-t-lg font-semibold text-gray-700">
              <th className=" text-center pr-24 p-2 ">Product</th>
              <th className="text-center pr-24 p-2">Price</th>
              <th className="text-center pr-24 p-2">Quantity</th>
              <th className="text-center pr-24 p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">Your cart is empty</td>
              </tr>
            ) : (
              cartItems.map((item, index) => (
                <tr key={item.productId || index} className="border-b border-gray-200">
                  <td className="p-4 flex items-center space-x-2">
                    <img src={item.imgURL} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <span className="text-base font-medium">{item.name}</span>
                  </td>
                  <td className="p-4 text-gray-600">Rs. {parseFloat(item.price).toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => decrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-l-lg text-black">-</button>
                      <span className="px-4 py-1 border">{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-r-lg text-black">+</button>
                    </div>
                  </td>
                  <td className="p-4 flex justify-between items-center">
                    <p className="text-gray-600">Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item)} className="text-yellow-500 hover:text-yellow-700 text-xl">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full md:w-1/4 p-6 bg-beige-100 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p>Rs. {totalAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>Rs. {totalAmount.toFixed(2)}</p>
        </div>
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0 || loading}
          className="w-full mt-6 px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
        >
          {loading ? "Processing..." : "Check Out"}
        </button>
      </div>
      
    </div>
  </div> */}
  {/* <div className="container mx-auto p-4 md:p-8 font-poppins max-w-7xl">
  <div className="flex flex-col gap-8 ">
    
    <div className="w-full">
     
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse hidden md:table">
          <thead>
            <tr className="bg-beige-200 rounded-t-lg font-semibold text-gray-700">
              <th className="text-center p-2">Product</th>
              <th className="text-center p-2">Price</th>
              <th className="text-center p-2">Quantity</th>
              <th className="text-center p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">Your cart is empty</td>
              </tr>
            ) : (
              cartItems.map((item, index) => (
                <tr key={item.productId || index} className="border-b border-gray-200">
                  <td className="p-4 flex items-center space-x-2">
                    <img src={item.imgURL} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <span className="text-sm md:text-base font-medium">{item.name}</span>
                  </td>
                  <td className="p-4 text-gray-600">Rs. {parseFloat(item.price).toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => decrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-l-lg text-black">-</button>
                      <span className="px-3 py-1 border">{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-r-lg text-black">+</button>
                    </div>
                  </td>
                  <td className="p-4 flex justify-between items-center">
                    <p className="text-gray-600">Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item)} className="text-yellow-500 hover:text-yellow-700 text-xl">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {cartItems.length === 0 ? (
          <p className="text-center p-4">Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.productId || index} className="flex flex-col bg-white p-4 mb-4 shadow-md rounded-lg">
              <div className="flex items-center gap-4">
                <img src={item.imgURL} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">Rs. {parseFloat(item.price).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <button onClick={() => decrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-l-lg text-black">-</button>
                  <span className="px-4 py-1 border">{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-r-lg text-black">+</button>
                </div>
                <button onClick={() => removeFromCart(item)} className="text-yellow-500 hover:text-yellow-700 text-xl">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
 
    <div className="w-full md:max-w-lg p-6 bg-beige-100 rounded-lg shadow-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
      <div className="flex justify-between mb-2">
        <p>Subtotal</p>
        <p>Rs. {totalAmount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <p>Total</p>
        <p>Rs. {totalAmount.toFixed(2)}</p>
      </div>
      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0 || loading}
        className="w-full mt-6 px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
      >
        {loading ? "Processing..." : "Check Out"}
      </button>
    </div>

  </div>
</div> */}

<div className="container mx-auto p-4 md:p-8 font-poppins max-w-7xl">
  <div className="flex flex-col lg:flex-row gap-8">

    {/* Cart Table Section */}
    <div className="w-full lg:w-3/4">
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse hidden lg:table">
          <thead>
            <tr className="bg-beige-200 rounded-t-lg font-semibold text-gray-700">
              <th className="text-center pr-24 p-2">Product</th>
              <th className="text-center pr-24  p-2">Price</th>
              <th className="text-center pr-24  p-2">Quantity</th>
              <th className="text-center pr-24  p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">Your cart is empty</td>
              </tr>
            ) : (
              cartItems.map((item, index) => (
                <tr key={item.productId || index} className="border-b border-gray-200">
                  <td className="p-4 flex items-center space-x-2">
                    <img src={item.imgURL} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <span className="text-sm lg:text-base font-medium">{item.name}</span>
                  </td>
                  <td className="p-4 text-gray-600">Rs. {parseFloat(item.price).toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => decrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-l-lg text-black">-</button>
                      <span className="px-3 py-1 border">{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-r-lg text-black">+</button>
                    </div>
                  </td>
                  <td className="p-4 flex justify-between items-center">
                    <p className="text-gray-600">Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item)} className="text-yellow-500 hover:text-yellow-700 text-xl">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cart Items as List */}
      <div className="lg:hidden">
        {cartItems.length === 0 ? (
          <p className="text-center p-4">Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.productId || index} className="flex flex-col bg-white p-4 mb-4 shadow-md rounded-lg">
              <div className="flex items-center gap-4">
                <img src={item.imgURL} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">Rs. {parseFloat(item.price).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <button onClick={() => decrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-l-lg text-black">-</button>
                  <span className="px-4 py-1 border">{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item)} className="px-2 py-1 bg-gray-300 rounded-r-lg text-black">+</button>
                </div>
                <button onClick={() => removeFromCart(item)} className="text-yellow-500 hover:text-yellow-700 text-xl">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Cart Totals Section */}
    <div className="w-full lg:w-1/4 p-6 bg-beige-100 rounded-lg shadow-md mt-8 lg:mt-0">
      <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
      <div className="flex justify-between mb-2">
        <p>Subtotal</p>
        <p>Rs. {totalAmount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <p>Total</p>
        <p>Rs. {totalAmount.toFixed(2)}</p>
      </div>
      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0 || loading}
        className="w-full mt-6 px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
      >
        {loading ? "Processing..." : "Check Out"}
      </button>
    </div>

  </div>
</div>


</div>

  );
};

export default Cart;
