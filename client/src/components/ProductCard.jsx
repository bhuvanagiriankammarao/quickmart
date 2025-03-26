// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaEllipsisV, FaHeart, FaShare } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { add } from "../store/cartSlice";
// import { addToWishlist, removeFromWishlist, fetchWishlist } from "../store/wishlistSlice";
// import { BsFillCartCheckFill } from "react-icons/bs";
// import { auth } from "../firebaseConfig";
// import axios from "axios";

// const ProductCard = ({ productId, imgURL, name, quantity, price, originalprice }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const wishlist = useSelector((state) => state.wishlist.items);
//   const isWishlisted = wishlist.some((item) => item.productId === productId);
//   const [notification, setNotification] = useState({ visible: false, productName: "" });
//   const user = auth.currentUser;

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   const handleWishlist = async () => {
//     if (!user) {
//       navigate("/signin");
//       return;
//     }
//     const product = { productId, name, imgURL, price, quantity, originalprice, email: user.email };
//     if (isWishlisted) {
//       dispatch(removeFromWishlist(product.productId));
//       await axios.post("http://localhost:5000/api/wishlist/remove", { email: user.email, productId });
//     } else {
//       dispatch(addToWishlist(product));
//       await axios.post("http://localhost:5000/api/wishlist/add", product);
//     }
//   };

//   const addToCart = async () => {
//     if (!user) {
//       navigate("/signin");
//       return;
//     }

//     const product = { 
//       productId, 
//       imgURL, 
//       name, 
//       price, 
//       originalprice, 
//       email: user.email,
//       quantity: 1 
//     };
  
//     try {
//       console.log("📤 Sending to backend:", product); 
  
//       const response = await axios.post("http://localhost:5000/api/cart/add", product);
//       console.log(" Backend response:", response.data); 
  
//       dispatch(add(product));
//       showNotification(name);
//     } catch (error) {
//       console.error("❌ Error adding to cart:", error);
//       alert("Failed to add product to cart. Please try again.");
//     }
//   };
  
//   const showNotification = (productName) => {
//     setNotification({ visible: true, productName });
//     setTimeout(() => {
//       setNotification({ visible: false, productName: "" });
//     }, 3000);
//   };

//   const handleViewDetails = () => {
//     navigate(`/product-details/${productId}`);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       {notification.visible && (
//         <div className="fixed top-4 right-96 bg-green-600 text-white py-3 px-6 rounded-xl left-1/3 transform -translate-x-1/2 text-lg font-bold shadow-lg z-50 animate-slide-down font-poppins">
//           <p className="flex items-center gap-2">
//             <span className="animate-pulse">
//               <BsFillCartCheckFill />
//             </span>
//             {notification.productName} added to cart!
//           </p>
//         </div>
//       )}

//       <div
//         onClick={() => {
//           handleViewDetails();
//           scrollToTop();
//         }}
//         className="relative flex flex-col items-center ml-10 max-sm:ml-16 rounded-lg p-4 
//         w-56 hover:shadow-xl transition-shadow group cursor-pointer"
//       >
//         <div className="mb-3 overflow-hidden">
//           <img
//             src={imgURL}
//             alt={name}
//             className="w-40 h-40 max-sm:h-40 max-sm:w-24 object-cover transition-transform duration-300 group-hover:scale-110"
//           />
//         </div>
//         <div className="text-left font-poppins w-full h-28 bg-[#F4F5F7] p-2">
//           <p className="text-base font-semibold text-dimGray">{name}</p>
//           <p className="text-custom-14 font-500 text-stoneGray mb-2">{quantity}</p>
//           <div className="flex items-center space-x-2 mt-2">
//             <p className="text-custom-16 font-bold text-black">Rs.{price}</p>
//             <p className="text-sm text-gray-400 line-through">Rs.{originalprice}</p>
//           </div>
//         </div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="w-full flex justify-center">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 addToCart();
//               }}
//               className="text-orangeCustom font-semibold mb-4 bg-white w-40 h-12 rounded-lg group-hover:opacity-100 transition-opacity"
//             >
//               Add to cart
//             </button>
//           </div>
//           <div className="flex justify-around w-full cursor-pointer text-white font-semibold text-custom-13">
//             <span className="flex items-center space-x-1">
//               <FaShare />
//               <span>Share</span>
//             </span>
//             <span className="flex items-center space-x-1">
//               <FaEllipsisV />
//               <span>Compare</span>
//             </span>
//             <span
//               className="flex items-center space-x-1 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleWishlist();
//               }}
//             >
//               <FaHeart className={isWishlisted ? "text-red-500" : ""} />
//               <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;









//responsive
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaEllipsisV, FaHeart, FaShare } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { add } from "../store/cartSlice";
// import { addToWishlist, removeFromWishlist, fetchWishlist } from "../store/wishlistSlice";
// import { BsFillCartCheckFill } from "react-icons/bs";
// import { auth } from "../firebaseConfig";
// import axios from "axios";

// const ProductCard = ({ productId, imgURL, name, quantity, price, originalprice }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const wishlist = useSelector((state) => state.wishlist.items);
//   const isWishlisted = wishlist.some((item) => item.productId === productId);
//   const [notification, setNotification] = useState({ visible: false, productName: "" });
//   const user = auth.currentUser;

//   // Calculate percentage discount, e.g. 16% OFF
//   const discountPercentage =
//     originalprice && originalprice > price
//       ? Math.round(((originalprice - price) / originalprice) * 100)
//       : 0;

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   const handleWishlist = async () => {
//     if (!user) {
//       navigate("/signin");
//       return;
//     }
//     const product = {
//       productId,
//       name,
//       imgURL,
//       price,
//       quantity,
//       originalprice,
//       email: user.email,
//     };
//     if (isWishlisted) {
//       dispatch(removeFromWishlist(productId));
//       await axios.post("http://localhost:5000/api/wishlist/remove", {
//         email: user.email,
//         productId,
//       });
//     } else {
//       dispatch(addToWishlist(product));
//       await axios.post("http://localhost:5000/api/wishlist/add", product);
//     }
//   };

//   const addToCart = async () => {
//     if (!user) {
//       navigate("/signin");
//       return;
//     }
//     const product = {
//       productId,
//       imgURL,
//       name,
//       price,
//       originalprice,
//       email: user.email,
//       quantity: 1,
//     };

//     try {
//       await axios.post("http://localhost:5000/api/cart/add", product);
//       dispatch(add(product));
//       showNotification(name);
//     } catch (error) {
//       console.error("❌ Error adding to cart:", error);
//       alert("Failed to add product to cart. Please try again.");
//     }
//   };

//   const showNotification = (productName) => {
//     setNotification({ visible: true, productName });
//     setTimeout(() => {
//       setNotification({ visible: false, productName: "" });
//     }, 3000);
//   };

//   const handleViewDetails = () => {
//     navigate(`/product-details/${productId}`);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       {notification.visible && (
//         <div className="fixed top-4 right-96 bg-green-600 text-white py-3 px-6
//          rounded-xl left-1/3 transform -translate-x-1/2 text-lg font-bold shadow-lg z-50 
//          animate-slide-down font-poppins">
//           <p className="flex items-center gap-2">
//             <span className="animate-pulse">
//               <BsFillCartCheckFill />
//             </span>
//             {notification.productName} added to cart!
//           </p>
//         </div>
//       )}

//       <div
//         onClick={() => {
//           handleViewDetails();
//           scrollToTop();
//         }}
//         className="relative flex flex-col items-center ml-10 max-sm:ml-1 
//         rounded-lg p-4 w-56 hover:shadow-xl transition-shadow group cursor-pointer"
//       >
//         {/* Discount badge in the top-left corner */}
//         {/* {discountPercentage > 0 && (
//           <div className="absolute top-2 left-2 bg-[#16a2f4] text-white text-xs font-bold px-2 py-1 rounded">
//             {discountPercentage}% OFF
//           </div>
//         )} */}
//         {discountPercentage > 0 && (
//   <div className="absolute top-2 left-2">
//     <div className="relative bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md border border-white">
//       <span className="uppercase tracking-wide">
//         {discountPercentage}% OFF
//       </span>
//     </div>
//   </div>
// )}




//         {/* Product image */}
//         <div className="mb-3 overflow-hidden">
//           <img
//             src={imgURL}
//             alt={name}
//             className="w-40 max-sm:w-10 h-40 max-sm:h-32  object-cover 
//             transition-transform duration-300 "
//           />
//         </div>

//         {/* Basic info */}
//         <div className="text-left font-poppins w-full  h-28 bg-[#F4F5F7] p-2">
//           <p className="text-base max-sm:text-sm font-semibold text-dimGray">{name}</p>
//           <p className="text-custom-14 font-500 text-stoneGray mb-2">{quantity}</p>
//           <div className="flex items-center space-x-2 mt-2">
//             <p className="text-custom-16 font-bold text-black">Rs.{price}</p>
//             {originalprice && (
//               <p className="text-sm text-gray-400 line-through">Rs.{originalprice}</p>
//             )}
//           </div>
//         </div>

//         {/* Always-visible buttons on small & medium */}
//         <div className="flex w-full items-center justify-around mt-2 lg:hidden">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               addToCart();
//             }}
//             className="text-white bg-green-500 px-4 py-2 rounded-lg font-semibold"
//           >
//             ADD
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleWishlist();
//             }}
//             className="px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-center"
//           >
//             <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-500"} />
//           </button>
//         </div>

//         {/* Hover overlay on large screens */}
//         <div className="hidden lg:flex absolute inset-0 flex-col items-center justify-center bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="w-full flex justify-center mb-4">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 addToCart();
//               }}
//               className="text-orangeCustom font-semibold bg-white w-40 h-12 rounded-lg"
//             >
//               Add to cart
//             </button>
//           </div>
//           <div className="flex justify-around w-full cursor-pointer text-white font-semibold text-custom-13">
//             <span className="flex items-center space-x-1">
//               <FaShare />
//               <span>Share</span>
//             </span>
//             <span className="flex items-center space-x-1">
//               <FaEllipsisV />
//               <span>Compare</span>
//             </span>
//             <span
//               className="flex items-center space-x-1 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleWishlist();
//               }}
//             >
//               <FaHeart className={isWishlisted ? "text-red-500" : ""} />
//               <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisV, FaHeart, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { add } from "../store/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../store/wishlistSlice";
import { BsFillCartCheckFill } from "react-icons/bs";
import { auth } from "../firebaseConfig";
import axios from "axios";
import { gsap } from "gsap";

const ProductCard = ({ productId, imgURL, name, quantity, price, originalprice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.productId === productId);
  const [notification, setNotification] = useState({ visible: false, productName: "" });
  const user = auth.currentUser;

  // Calculate percentage discount
  const discountPercentage =
    originalprice && originalprice > price
      ? Math.round(((originalprice - price) / originalprice) * 100)
      : 0;


  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);



  const handleWishlist = async () => {
    if (!user) {
      navigate("/signin");
      return;
    }
    const product = { productId, name, imgURL, price, quantity, originalprice, email: user.email };
    if (isWishlisted) {
      dispatch(removeFromWishlist(productId));
      await axios.post("http://localhost:5000/api/wishlist/remove", { email: user.email, productId });
    } else {
      dispatch(addToWishlist(product));
      await axios.post("http://localhost:5000/api/wishlist/add", product);
    }
  };

  const addToCart = async () => {
    if (!user) {
      navigate("/signin");
      return;
    }
    const product = { productId, imgURL, name, price, originalprice, email: user.email, quantity: 1 };
    try {
      await axios.post("http://localhost:5000/api/cart/add", product);
      dispatch(add(product));
      showNotification(name);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const showNotification = (productName) => {
    setNotification({ visible: true, productName });
    setTimeout(() => {
      setNotification({ visible: false, productName: "" });
    }, 3000);
  };

  const handleViewDetails = () => {
    navigate(`/product-details/${productId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {notification.visible && (
        <div className="fixed top-4 right-96 bg-green-600 text-white py-3 px-6 rounded-xl left-1/3 transform -translate-x-1/2 text-lg font-bold shadow-lg z-50 animate-slide-down font-poppins">
          <p className="flex items-center gap-2">
            <span className="animate-pulse">
              <BsFillCartCheckFill />
            </span>
            {notification.productName} added to cart!
          </p>
        </div>
      )}

      <div
        onClick={() => {
          handleViewDetails();
          scrollToTop();
        }}
        className="relative flex flex-col items-center ml-10 max-sm:ml-1 rounded-lg p-4 w-56 hover:shadow-xl transition-shadow group cursor-pointer"
      >
        {/* Discount Badge with GSAP Animation */}
                {discountPercentage > 0 && (
  <div className="absolute top-2 left-2">
    <div className="relative bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md border border-white">
      <span className="uppercase tracking-wide">
        {discountPercentage}% OFF
      </span>
    </div>
  </div>
)}

        {/* Product Image */}
        <div className="mb-3 overflow-hidden">
          <img
            src={imgURL}
            alt={name}
            className="w-40 h-40 max-sm:w-24 max-sm:h-32 object-cover transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="text-left font-poppins w-full h-28 bg-[#F4F5F7] p-2">
          <p className="text-base max-sm:text-sm font-semibold text-dimGray ">{name}</p>
          <p className="text-custom-14 max-sm:text-[10px] font-500 text-stoneGray mb-2">{quantity}</p>
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-custom-16 font-bold text-black">Rs.{price}</p>
            {originalprice && (
              <p className="text-sm text-gray-400 line-through">Rs.{originalprice}</p>
            )}
          </div>
        </div>

        {/* Always-visible Buttons on Small & Medium Devices */}
        <div className="flex w-full items-center justify-around mt-2 lg:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            className="text-white bg-green-500 px-4 py-2 rounded-lg font-semibold"
          >
            ADD
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWishlist();
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-center"
          >
            <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-500"} />
          </button>
        </div>

        {/* Hover Overlay on Large Screens */}
        <div className="hidden lg:flex absolute inset-0 flex-col items-center justify-center bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-full flex justify-center mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
              className="text-orangeCustom font-semibold bg-white w-40 h-12 rounded-lg"
            >
              Add to cart
            </button>
          </div>
          <div className="flex justify-around w-full cursor-pointer text-white font-semibold text-custom-13">
            <span className="flex items-center space-x-1">
              <FaShare />
              <span>Share</span>
            </span>
            <span className="flex items-center space-x-1">
              <FaEllipsisV />
              <span>Compare</span>
            </span>
            <span
              className="flex items-center space-x-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleWishlist();
              }}
            >
              <FaHeart className={isWishlisted ? "text-red-500" : ""} />
              <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
