// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { add } from "../../store/cartSlice";
// import { removeFromWishlist, fetchWishlist } from "../../store/wishlistSlice";
// import { FaEllipsisV, FaHeart, FaShare } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; 

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const wishlist = useSelector((state) => state.wishlist.items);

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   const addToCart = (item) => {
//     dispatch(add(item));
//     dispatch(removeFromWishlist(item.productId));
//   };
  

//   const handleViewDetails = (productId) => {
//     navigate(`/product-details/${productId}`);
//   };

//   return (
//     <div className="container mx-auto p-4 font-poppins pt-32 ">
//       <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
//       {wishlist.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {wishlist.map((item) => (
//             <div
//             onClick={() => {
//               handleViewDetails((item.productId)); }}
              
//               key={item.productId}
//               className="relative flex flex-col items-center rounded-lg p-4 pb-10 w-56 
//               hover:shadow-xl transition-shadow group cursor-pointer"
//             >
//               <div className="mb-3 overflow-hidden">
//                 <img
//                   src={item.imgURL}
//                   alt={item.name}
//                   className="w-40 h-40 max-sm:h-40 max-sm:w-24 object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//               </div>
//               <div className="text-left font-poppins w-full h-28 bg-[#F4F5F7] p-2">
//                 <p className="text-lg font-semibold text-dimGray">{item.name}</p>
//                 <p className="text-custom-14 font-500 text-stoneGray mb-2">{item.quantity}</p>
//                 <div className="flex items-center space-x-2 mt-2">
//                   <p className="text-custom-16 font-bold text-black">Rs.{item.price}</p>
//                   <p className="text-sm text-gray-400 line-through">Rs.{item.originalprice}</p>
//                 </div>
//               </div>
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <button
//                   // onClick={() => addToCart(item)}
//                   onClick={(e) => {
//                     e.stopPropagation(); // ✅ Prevent click event from bubbling
//                     addToCart(item);
//                   }}
                  
//                   className="text-orangeCustom font-semibold mb-4 bg-white w-40 h-12 rounded-lg group-hover:opacity-100 transition-opacity"
//                 >
//                   Add to Cart
//                 </button>
//                 <div className="flex justify-around w-full cursor-pointer text-white font-semibold text-custom-13">
//                   <span className="flex items-center space-x-1">
//                     <FaShare />
//                     <span>Share</span>
//                   </span>
//                   <span className="flex items-center space-x-1">
//                     <FaEllipsisV />
//                     <span>Compare</span>
//                   </span>
//                   <span
//                     className="flex items-center space-x-1 cursor-pointer"
//                     onClick={() => dispatch(removeFromWishlist(item.productId))}
//                   >
//                     <FaHeart className="text-red-500" />
//                     <span>Remove</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Your wishlist is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Wishlist;








//responisveness
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { add } from "../../store/cartSlice";
// import { removeFromWishlist, fetchWishlist } from "../../store/wishlistSlice";
// import { FaEllipsisV, FaHeart, FaShare } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; 

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const wishlist = useSelector((state) => state.wishlist.items);

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   const addToCart = (item) => {
//     dispatch(add(item));
//     dispatch(removeFromWishlist(item.productId));
//   };
  
//   const handleViewDetails = (productId) => {
//     navigate(`/product-details/${productId}`);
//   };

//   return (
//     <div className="container mx-auto p-4 font-poppins pt-16 sm:pt-32">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4">My Wishlist</h1>
//       {wishlist.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {wishlist.map((item) => (
//             <div
//               onClick={() => handleViewDetails(item.productId)}
//               key={item.productId}
//               className="relative flex flex-col items-center rounded-lg p-4 pb-10 w-full md:w-56 hover:shadow-xl transition-shadow group cursor-pointer"
//             >
//               <div className="mb-3 overflow-hidden">
//                 <img
//                   src={item.imgURL}
//                   alt={item.name}
//                   className="w-24 h-24 sm:w-40 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//               </div>
//               <div className="text-left w-full h-auto sm:h-28 bg-[#F4F5F7] p-2">
//                 <p className="text-sm sm:text-lg font-semibold text-dimGray">{item.name}</p>
//                 <p className="text-custom-14 font-500 text-stoneGray mb-2">{item.quantity}</p>
//                 <div className="flex items-center space-x-2 mt-2">
//                   <p className="text-custom-16 font-bold text-black">Rs.{item.price}</p>
//                   <p className="text-sm text-gray-400 line-through">Rs.{item.originalprice}</p>
//                 </div>
//               </div>
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     addToCart(item);
//                   }}
//                   className="text-orangeCustom font-semibold mb-4 bg-white w-full sm:w-40 h-12 rounded-lg transition-opacity"
//                 >
//                   Add to Cart
//                 </button>
//                 <div className="flex justify-around w-full cursor-pointer text-white font-semibold text-custom-13">
//                   <span className="flex items-center space-x-1">
//                     <FaShare />
//                     <span>Share</span>
//                   </span>
//                   <span className="flex items-center space-x-1">
//                     <FaEllipsisV />
//                     <span>Compare</span>
//                   </span>
//                   <span
//                     className="flex items-center space-x-1 cursor-pointer"
//                     onClick={() => dispatch(removeFromWishlist(item.productId))}
//                   >
//                     <FaHeart className="text-red-500" />
//                     <span>Remove</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Your wishlist is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Wishlist;



//buttons

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/cartSlice";
import { removeFromWishlist, fetchWishlist } from "../../store/wishlistSlice";
import { FaEllipsisV, FaHeart, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const addToCart = (item) => {
    dispatch(add(item));
    dispatch(removeFromWishlist(item.productId));
  };
  
  const handleViewDetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="container mx-auto p-4 font-poppins pt-16 sm:pt-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 max-sm:pt-10">My Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              onClick={() => handleViewDetails(item.productId)}
              key={item.productId}
              className="relative flex flex-col items-center rounded-lg p-4 pb-10 w-full md:w-56 hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <div className="mb-3 overflow-hidden">
                <img
                  src={item.imgURL}
                  alt={item.name}
                  className="w-24 h-24 sm:w-40 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-left w-full h-auto sm:h-28 bg-[#F4F5F7] p-2">
                <p className="text-sm sm:text-lg font-semibold text-dimGray">{item.name}</p>
                <p className="text-custom-14 font-500 text-stoneGray mb-2">{item.quantity}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <p className="text-custom-16 font-bold text-black">Rs.{item.price}</p>
                  <p className="text-sm text-gray-400 line-through">Rs.{item.originalprice}</p>
                </div>
              </div>
              
              {/* Always-visible Buttons on Small & Medium Devices */}
              <div className="flex w-full items-center justify-around mt-2 lg:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="text-white bg-green-500 px-4 py-2 rounded-lg font-semibold"
                >
                  ADD
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromWishlist(item.productId));
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-center"
                >
                  <FaHeart className="text-red-500" />
                </button>
              </div>
              
              {/* Hover Overlay on Large Screens */}
              <div className="hidden lg:flex absolute inset-0 flex-col items-center justify-center bg-dimGray bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="text-orangeCustom font-semibold mb-4 bg-white w-full sm:w-40 h-12 rounded-lg transition-opacity"
                >
                  Add to Cart
                </button>
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
                      dispatch(removeFromWishlist(item.productId));
                    }}
                  >
                    <FaHeart className="text-red-500" />
                    <span>Remove</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;













// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchWishlist } from "../../store/wishlistSlice";
// import ProductCard from "../../components/ProductCard";

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const wishlist = useSelector((state) => state.wishlist.items);

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   return (
//     <div className="container mx-auto p-4 font-poppins pt-28">
//       <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
//       {wishlist.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {wishlist.map((item) => (
//             <ProductCard key={item.productId} product={item} fromWishlist={true} 
//             imgURL={item.imgURL}   
//             name={item.name}
//             quantity={item.quantity}
//             price={item.price}
//             originalprice={item.originalprice}  
//             productId={item.productId} />
//           ))}
//         </div>
//       ) : (
//         <p>Your wishlist is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Wishlist;



//detaisl
