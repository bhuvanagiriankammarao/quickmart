//search
// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaSearch,
//   FaUserCircle,
//   FaHeart,
//   FaShoppingCart,
//   FaBars,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { auth } from "../firebaseConfig";
// import { signOut } from "firebase/auth";
// import logo from "../assets/images/logo.png";
// import Search from "../components/Search";

// const Navbar = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const dropdownTimeout = useRef(null);
//   const [walletCoins, setWalletCoins] = useState(0); 

//   useEffect(() => {
//     // Fetch the current user information from Firebase (if logged in)
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       // Display user's name or fallback to email if name is not set
//       setUserName(currentUser.displayName || currentUser.email.split("@")[0]);

//       // Fetch wallet coins for the logged-in user
//       fetchWalletCoins(currentUser.email); // Firebase email
//     } else {
//       setUserName("");
//       setWalletCoins(0); 
//     }
//   }, [auth.currentUser]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUserName("");
//         navigate("/SignIn");
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//       });
//   };

//   const handleMouseEnter = () => {
//     clearTimeout(dropdownTimeout.current);
//     setIsDropdownOpen(true);
//   };

//   const handleMouseLeave = () => {
//     dropdownTimeout.current = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 300);
//   };

//   const fetchWalletCoins = async (email) => {
//     try {
//       console.log("Fetching wallet coins for email:", email);
//       const response = await fetch(
//         `http://localhost:5000/api/auth/coins/${email}`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWalletCoins(data.coins); 
//       } else {
//         console.error("Error fetching coins:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching wallet coins:", error);
//     }
//   };

//   return (
//     <nav className="shadow-md p-4 font-poppins h-20 lg:h-24 pt-6  fixed z-20 bg-white w-full   ">
//       <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between 
//       items-center">
//         <div className="relative flex justify-between w-full lg:w-auto items-center mb-4 lg:mb-0">
//           <Link to="/" className="flex items-center">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-40 h-30 animate-cart-slide-in"
//             />
//           </Link>
//           <div className="flex items-center gap-3 lg:hidden">
//             <Link to="/wishlist">
//               <FaHeart
//                 size={20}
//                 className="cursor-pointer hover:text-gray-600"
//               />
//             </Link>
//             <Link to="/cart">
//               <div className="relative">
//                 <FaShoppingCart
//                   size={20}
//                   className="cursor-pointer hover:text-gray-600"
//                 />
//                 {cartItemCount > 0 && (
//                   <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </div>
//             </Link>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-blue-900 lg:hidden"
//             >
//               <FaBars size={20} />
//             </button>
//           </div>
//         </div>

//         <ul
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } lg:flex flex-col lg:flex-row gap-6 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 text-blue-900 lg:static absolute top-20 left-0 z-50 font-bold font-poppins`}
//         >
//           <li className="hover:text-green-600">
//             <Link to="/" onClick={() => setIsMenuOpen(false)}>
//               HOME
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
//               SHOP
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/about" onClick={() => setIsMenuOpen(false)}>
//               ABOUT
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
//               CONTACT
//             </Link>
//           </li>
//         </ul>

//         <div className="w-full lg:w-auto lg:mt-0 flex pt-6 lg:pt-0">
//           <Search />
//         </div>

//         <div className="hidden lg:flex items-center gap-6 text-blue-900 relative">
//           <Link to="/wishlist">
//             <FaHeart
//               size={24}
//               className="cursor-pointer hover:text-green-600"
//             />
//           </Link>
//           <Link to="/cart">
//             <div className="relative">
//               <FaShoppingCart
//                 size={24}
//                 className="cursor-pointer hover:text-green-600"
//               />
//               {cartItemCount > 0 && (
//                 <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </div>
//           </Link>
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <button className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaUserCircle size={24} />
//               <span>{userName ? userName : "Account"}</span>
//             </button>
//             {/* {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
//                  <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>

//                 <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">My Account</Link>
//                 <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
//                 <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/SignIn")}>Log In</button>
//                 {userName && (
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//                     onClick={handleLogout}
//                   >
//                     Log Out
//                   </button>
//                 )}
//               </div>
//             )} */}
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
//                 <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>{" "}
//                 {/* Display wallet coins */}
//                 {userName ? (
//                   <>
//                     <Link
//                       to="/account"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       My Account
//                     </Link>
//                     <Link
//                       to="/wishlist"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Wishlist
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Orders
//                     </Link>
//                     <button
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//                       onClick={handleLogout}
//                     >
//                       Log Out
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => navigate("/SignIn")}
//                   >
//                     Log In
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


//responsive
// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaSearch,
//   FaUserCircle,
//   FaHeart,
//   FaShoppingCart,
//   FaBars,
// } from "react-icons/fa";
// import { RiAccountCircleFill } from "react-icons/ri";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { auth } from "../firebaseConfig";
// import { signOut } from "firebase/auth";
// import logo from "../assets/images/logo.png";
// import Search from "../components/Search";

// const Navbar = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const dropdownTimeout = useRef(null);
//   const [walletCoins, setWalletCoins] = useState(0);

//   useEffect(() => {
//     // Fetch the current user information from Firebase (if logged in)
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       // Display user's name or fallback to email if name is not set
//       setUserName(
//         currentUser.displayName || currentUser.email.split("@")[0]
//       );
//       // Fetch wallet coins for the logged-in user
//       fetchWalletCoins(currentUser.email);
//     } else {
//       setUserName("");
//       setWalletCoins(0);
//     }
//   }, [auth.currentUser]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUserName("");
//         navigate("/SignIn");
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//       });
//   };

//   const handleMouseEnter = () => {
//     clearTimeout(dropdownTimeout.current);
//     setIsDropdownOpen(true);
//   };

//   const handleMouseLeave = () => {
//     dropdownTimeout.current = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 300);
//   };

//   const fetchWalletCoins = async (email) => {
//     try {
//       console.log("Fetching wallet coins for email:", email);
//       const response = await fetch(
//         `http://localhost:5000/api/auth/coins/${email}`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWalletCoins(data.coins);
//       } else {
//         console.error("Error fetching coins:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching wallet coins:", error);
//     }
//   };

//   const getNavLinkClasses = ({ isActive }) =>
//   isActive
//     ? "text-green-600 border-b-2 border-green-600 font-bold"
//     : "hover:text-green-600 font-bold";

//   return (
//     <nav className="shadow-md p-4 font-poppins h-20 lg:h-24 pt-6 fixed z-20
//      bg-white w-full ">
//       <div className="container mx-auto flex flex-col xl:flex-row xl:justify-between
//        items-center">
//         <div className="relative flex justify-between w-full xl:w-auto items-center mb-4
//          xl:mb-0">
//           <Link to="/" className="flex items-center">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-40 h-30 animate-cart-slide-in"
//             />
//           </Link>
          
//           {/* Mobile Icons */}
//           <div className="flex items-center gap-3 xl:hidden">
//             <Link to="/wishlist">
//               <FaHeart
//                 size={20}
//                 className="cursor-pointer hover:text-green-600 text-blue-900"
//               />
//             </Link>
//             <Link to="/cart">
//               <div className="relative">
//                 <FaShoppingCart
//                   size={20}
//                   className="cursor-pointer hover:text-green-600 text-blue-900"
//                 />
//                 {cartItemCount > 0 && (
//                   <span className="absolute top-0 right-0 bg-green-600
//                    text-white text-xs rounded-full w-4 h-4 flex items-center 
//                    justify-center">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </div>
//             </Link>
//             {/* Mobile Account Dropdown */}
//             <div className="relative flex items-center ">
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="text-blue-900"
//               >
//                 <RiAccountCircleFill size={24} />
//               </button>
//               {isDropdownOpen && (
                
//                 <div className="absolute -right-4 top-4  mt-2  w-40 bg-white shadow-lg 
//                 rounded-lg py-2 z-50">
//                      <span className="px-4 py-2">{userName ? userName : "Account"}</span>
//                      <hr className=" h-[2px] bg-gray-500 border-none w-40 my-2" />
//                   <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>
//                   {userName ? (
//                     <>
//                       <Link
//                         to="/account"
//                         className="block px-4 py-2 hover:text-green-600"
//                       >
//                         My Account
//                       </Link>
//                       <Link
//                         to="/wishlist"
//                         className="block px-4 py-2 hover:text-green-600"
//                       >
//                         Wishlist
//                       </Link>
//                       <Link
//                         to="/orders"
//                         className="block px-4 py-2 hover:text-green-600"
//                       >
//                         Orders
//                       </Link>
//                       <button
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100
//                          text-red-500"
//                         onClick={handleLogout}
//                       >
//                         Log Out
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                       onClick={() => navigate("/SignIn")}
//                     >
//                       Log In
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-blue-900 xl:hidden hover:text-green-600"
//             >
//               <FaBars size={20} />
//             </button>
//           </div>
//         </div>

//         <ul
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } xl:flex flex-col xl:flex-row gap-6 w-full xl:w-auto bg-white 
//           xl:bg-transparent p-4 xl:p-0 text-blue-900 xl:static absolute
//            top-20 left-0 z-50 font-bold font-poppins`}
//         >
//           <li className="hover:text-green-600">
//             <Link to="/" onClick={() => setIsMenuOpen(false)}
//               className={getNavLinkClasses}>
//               HOME
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/shop" onClick={() => setIsMenuOpen(false)}
//               className={getNavLinkClasses}>
//               SHOP
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/about" onClick={() => setIsMenuOpen(false)}
//               className={getNavLinkClasses}>
//               ABOUT
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/contact" onClick={() => setIsMenuOpen(false)}
//               className={getNavLinkClasses}>
//               CONTACT
//             </Link>
//           </li>
//         </ul>

//         <div className="w-full lg:w-auto lg:mt-0 flex pt-[8px] ">
//           <Search />
//         </div>

//         {/* Desktop Account Dropdown */}
//         <div className="hidden xl:flex items-center gap-6 text-blue-900 relative">
//           <Link to="/wishlist">
//             <FaHeart
//               size={24}
//               className="cursor-pointer hover:text-green-600 "
              
//             />
//           </Link>
//           <Link to="/cart">
//             <div className="relative">
//               <FaShoppingCart
//                 size={24}
//                 className="cursor-pointer hover:text-green-600"
//               />
//               {cartItemCount > 0 && (
//                 <span className="absolute top-0 right-0 bg-green-600 text-white 
//                 text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </div>
//           </Link>
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <button className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaUserCircle size={24} />
//               <span>{userName ? userName : "Account"}</span>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2
//                z-50">
//                 <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>
//                 {userName ? (
//                   <>
//                     <Link
//                       to="/account"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       My Account
//                     </Link>
//                     <Link
//                       to="/wishlist"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Wishlist
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Orders
//                     </Link>
//                     <button
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100
//                        text-red-500"
//                       onClick={handleLogout}
//                     >
//                       Log Out
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => navigate("/SignIn")}
//                   >
//                     Log In
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaHeart,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/images/logo.png";
import Search from "../components/Search";

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [walletCoins, setWalletCoins] = useState(0);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email.split("@")[0]);
        fetchWalletCoins(user.email);
      } else {
        setUserName("");
        setWalletCoins(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserName("");
      navigate("/SignIn");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const fetchWalletCoins = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/coins/${email}`);
      const data = await response.json();
      if (response.ok) {
        setWalletCoins(data.coins);
      } else {
        console.error("Error fetching coins:", data.message);
      }
    } catch (error) {
      console.error("Error fetching wallet coins:", error);
    }
  };

  return (
    <nav className="shadow-md p-4 font-poppins fixed z-20 bg-white w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="flex items-center">
          <img src={logo} alt="Logo" className="w-40 h-30" />
        </Link>

        {/* Mobile Menu Button */}


        {/* Navigation Links */}
        <ul className={`xl:flex gap-6 ${isMenuOpen ? "block" : "hidden"} absolute xl:static top-16 left-0 w-full bg-white p-4 xl:p-0 z-50 xl:w-auto text-blue-900`}>          
          {["HOME", "SHOP", "ABOUT", "CONTACT"].map((text) => (
            <li key={text}>
              <NavLink
                to={`/${text.toLowerCase()}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 border-b-2 border-green-600 font-bold"
                    : "hover:text-green-600 font-bold"
                }
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div>
          <Search />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist">
            <FaHeart size={24} className="text-blue-900 hover:text-green-600" />
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart size={24} className="text-blue-900 hover:text-green-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          {/* <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <RiAccountCircleFill size={24} className="text-blue-900 hover:text-green-600" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-10 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                <span className="px-4 py-2">{userName || "Account"}</span>
                <hr className="h-[2px] bg-gray-500 border-none w-40 my-2" />
                <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>
                {userName ? (
                  <>
                    <Link to="/account" className="block px-4 py-2 hover:text-green-600">My Account</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:text-green-600">Orders</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                      Log Out
                    </button>
                  </>
                ) : (
                  <button onClick={() => navigate("/SignIn")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Log In
                  </button>
                )}
              </div>
            )}
          </div> */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden">
          <FaBars size={24} className="text-blue-900" />
        </button>
<div className="relative">
  {userName ? (
    // Show Account Icon Only When User is Logged In
    <>
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <RiAccountCircleFill size={28} className="text-blue-900 hover:text-green-600 mt-1" />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 top-10 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
          <span className="px-4 py-2">{userName}</span>
          <hr className="h-[2px] bg-gray-500 border-none w-40 my-2" />
          <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>
          <Link to="/account" className="block px-4 py-2 hover:text-green-600"
          onClick={() => setIsDropdownOpen(!isDropdownOpen) }>My Account</Link>
          <Link to="/orders" className="block px-4 py-2 hover:text-green-600"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Orders</Link>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
            Log Out
          </button>
        </div>
      )}
    </>
  ) : (
    // Show Login & Signup When No User is Logged In
    <div className="flex gap-4 font-poppins">
      <button onClick={() => navigate("/SignIn")} className="text-blue-900 hover:text-green-600">
        Log In/Sing UP
      </button>

    </div>
  )}
</div>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;






// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaSearch,
//   FaUserCircle,
//   FaHeart,
//   FaShoppingCart,
//   FaBars,
// } from "react-icons/fa";
// import { RiAccountCircleFill } from "react-icons/ri";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { auth } from "../firebaseConfig";
// import { signOut } from "firebase/auth";
// import logo from "../assets/images/logo.png";
// import Search from "../components/Search";

// const Navbar = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const dropdownTimeout = useRef(null);
//   const [walletCoins, setWalletCoins] = useState(0);

//   useEffect(() => {
//     // Fetch the current user information from Firebase (if logged in)
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       // Display user's name or fallback to email if name is not set
//       setUserName(
//         currentUser.displayName || currentUser.email.split("@")[0]
//       );
//       // Fetch wallet coins for the logged-in user
//       fetchWalletCoins(currentUser.email);
//     } else {
//       setUserName("");
//       setWalletCoins(0);
//     }
//   }, [auth.currentUser]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUserName("");
//         navigate("/SignIn");
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//       });
//   };

//   const handleMouseEnter = () => {
//     clearTimeout(dropdownTimeout.current);
//     setIsDropdownOpen(true);
//   };

//   const handleMouseLeave = () => {
//     dropdownTimeout.current = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 300);
//   };

//   const fetchWalletCoins = async (email) => {
//     try {
//       console.log("Fetching wallet coins for email:", email);
//       const response = await fetch(
//         `http://localhost:5000/api/auth/coins/${email}`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWalletCoins(data.coins);
//       } else {
//         console.error("Error fetching coins:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching wallet coins:", error);
//     }
//   };

//   // Define active and default classes for NavLink
//   const getNavLinkClasses = ({ isActive }) =>
//     isActive
//       ? "text-green-600 border-b-2 border-green-600 font-bold"
//       : "hover:text-green-600 font-bold";

//   return (
//     <nav className="shadow-md p-4 font-poppins h-20 lg:h-24 pt-6 fixed z-20 bg-white w-full">
//       <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
//         <div className="relative flex justify-between w-full lg:w-auto items-center mb-4 lg:mb-0">
//           <Link to="/" className="flex items-center">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-40 h-30 animate-cart-slide-in"
//             />
//           </Link>
//           {/* Mobile Icons */}
//           <div className="flex items-center gap-3 lg:hidden">
//             <Link to="/wishlist">
//               <FaHeart
//                 size={20}
//                 className="cursor-pointer hover:text-green-600 text-blue-900"
//               />
//             </Link>
//             <Link to="/cart">
//               <div className="relative">
//                 <FaShoppingCart
//                   size={20}
//                   className="cursor-pointer hover:text-green-600 text-blue-900"
//                 />
//                 {cartItemCount > 0 && (
//                   <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </div>
//             </Link>
//             {/* Mobile Account Dropdown */}
//             <div className="relative flex items-center ">
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="text-blue-900"
//               >
//                 <RiAccountCircleFill size={24} />
//               </button>
//               {isDropdownOpen && (
//                 <div className="absolute -right-4 top-4 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
//                   <span className="px-4 py-2">
//                     {userName ? userName : "Account"}
//                   </span>
//                   <hr className="h-[2px] bg-gray-500 border-none w-40 my-2" />
//                   <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>
//                   {userName ? (
//                     <>
//                       <Link
//                         to="/account"
//                         className="block px-4 py-2 hover:text-green-600"
//                       >
//                         My Account
//                       </Link>
//                       <Link
//                         to="/wishlist"
//                         className="block px-4 py-2 hover:text-green-600"
//                       >
//                         Wishlist
//                       </Link>
//                       <Link
//                         to="/orders"
//                         className="block px-4 py-2 hover:text-green-600"
//                       >
//                         Orders
//                       </Link>
//                       <button
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//                         onClick={handleLogout}
//                       >
//                         Log Out
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                       onClick={() => navigate("/SignIn")}
//                     >
//                       Log In
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-blue-900 lg:hidden hover:text-green-600"
//             >
//               <FaBars size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <ul
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } lg:flex flex-col lg:flex-row gap-6 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 text-blue-900 lg:static absolute top-20 left-0 z-50`}
//         >
//           <li>
//             <NavLink
//               to="/"
//               onClick={() => setIsMenuOpen(false)}
//               className={getNavLinkClasses}
//             >
//               HOME
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/shop"
//               onClick={() => setIsMenuOpen(false)}
//               className={getNavLinkClasses}
//             >
//               SHOP
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/about"
//               onClick={() => setIsMenuOpen(false)}
//               className={getNavLinkClasses}
//             >
//               ABOUT
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/contact"
//               onClick={() => setIsMenuOpen(false)}
//               className={getNavLinkClasses}
//             >
//               CONTACT
//             </NavLink>
//           </li>
//         </ul>

//         <div className="w-full lg:w-auto lg:mt-0 flex pt-[8px] lg:pt-0">
//           <Search />
//         </div>

//         {/* Desktop Account Dropdown */}
//         <div className="hidden lg:flex items-center gap-6 text-blue-900 relative">
//           <Link to="/wishlist">
//             <FaHeart
//               size={24}
//               className="cursor-pointer hover:text-green-600"
//             />
//           </Link>
//           <Link to="/cart">
//             <div className="relative">
//               <FaShoppingCart
//                 size={24}
//                 className="cursor-pointer hover:text-green-600"
//               />
//               {cartItemCount > 0 && (
//                 <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </div>
//           </Link>
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <button className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaUserCircle size={24} />
//               <span>{userName ? userName : "Account"}</span>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
//                 <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>
//                 {userName ? (
//                   <>
//                     <Link
//                       to="/account"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       My Account
//                     </Link>
//                     <Link
//                       to="/wishlist"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Wishlist
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Orders
//                     </Link>
//                     <button
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//                       onClick={handleLogout}
//                     >
//                       Log Out
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => navigate("/SignIn")}
//                   >
//                     Log In
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
















// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaSearch,
//   FaUserCircle,
//   FaHeart,
//   FaShoppingCart,
//   FaBars,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { auth } from "../firebaseConfig";
// import { signOut } from "firebase/auth";
// import logo from "../assets/images/logo.png";
// import Search from "../components/Search";
// import gsap from "gsap";

// const Navbar = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState("");
 
//   const [walletCoins, setWalletCoins] = useState(0);
//   const [isNavVisible, setIsNavVisible] = useState(true);

//     // Refs for dropdown delay and navbar container (used by GSAP)
//   const dropdownTimeout = useRef(null);
//   const navContainerRef = useRef(null);
 

//   useEffect(() => {
//     // Fetch the current user information from Firebase (if logged in)
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       // Display user's name or fallback to email if name is not set
//       setUserName(currentUser.displayName || currentUser.email.split("@")[0]);

//       // Fetch wallet coins for the logged-in user
//       fetchWalletCoins(currentUser.email); // Firebase email
//     } else {
//       setUserName("");
//       setWalletCoins(0); 
//     }
//   }, [auth.currentUser]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUserName("");
//         navigate("/SignIn");
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//       });
//   };

//   const handleMouseEnter = () => {
//     clearTimeout(dropdownTimeout.current);
//     setIsDropdownOpen(true);
//   };

//   const handleMouseLeave = () => {
//     dropdownTimeout.current = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 300);
//   };

//   const fetchWalletCoins = async (email) => {
//     try {
//       console.log("Fetching wallet coins for email:", email);
//       const response = await fetch(
//         `http://localhost:5000/api/auth/coins/${email}`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWalletCoins(data.coins); 
//       } else {
//         console.error("Error fetching coins:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching wallet coins:", error);
//     }
//   };



  
//   //gsap
//   useEffect(() => {
//     let lastScrollY = window.scrollY;
  
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setIsNavVisible(currentScrollY < lastScrollY || currentScrollY === 0);
//       lastScrollY = currentScrollY;
//     };
  
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
  
//   useEffect(() => {
//     if (navContainerRef.current) {
//       gsap.to(navContainerRef.current, {
//         y: isNavVisible ? 0 : -100, // Moves navbar up when hidden
//         opacity: isNavVisible ? 1 : 0,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     }
//   }, [isNavVisible]);
  

//   // Animate the navbar using GSAP when its visibility changes
//   useEffect(() => {
//     if (navContainerRef.current) {
//       gsap.to(navContainerRef.current, {
//         y: isNavVisible ? 0 : -100,
//         opacity: isNavVisible ? 1 : 0,
//         duration: 0.3,
//       });
//     }
//   }, [isNavVisible]);

//   return (
//     <nav
//     ref={navContainerRef}

//     className="shadow-md p-4 font-poppins h-20 lg:h-24 pt-6  ">
//       <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
//         <div className="relative flex justify-between w-full lg:w-auto items-center mb-4 lg:mb-0">
//           <Link to="/" className="flex items-center">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-40 h-30 animate-cart-slide-in"
//             />
//           </Link>
//           <div className="flex items-center gap-3 lg:hidden">
//             <Link to="/wishlist">
//               <FaHeart
//                 size={20}
//                 className="cursor-pointer hover:text-gray-600"
//               />
//             </Link>
//             <Link to="/cart">
//               <div className="relative">
//                 <FaShoppingCart
//                   size={20}
//                   className="cursor-pointer hover:text-gray-600"
//                 />
//                 {cartItemCount > 0 && (
//                   <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </div>
//             </Link>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-blue-900 lg:hidden"
//             >
//               <FaBars size={20} />
//             </button>
//           </div>
//         </div>

//         <ul
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } lg:flex flex-col lg:flex-row gap-6 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 text-blue-900 lg:static absolute top-20 left-0 z-50 font-bold font-poppins`}
//         >
//           <li className="hover:text-green-600">
//             <Link to="/" onClick={() => setIsMenuOpen(false)}>
//               HOME
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
//               SHOP
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/about" onClick={() => setIsMenuOpen(false)}>
//               ABOUT
//             </Link>
//           </li>
//           <li className="hover:text-green-600">
//             <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
//               CONTACT
//             </Link>
//           </li>
//         </ul>

//         <div className="w-full lg:w-auto lg:mt-0 flex pt-6 lg:pt-0">
//           <Search />
//         </div>

//         <div className="hidden lg:flex items-center gap-6 text-blue-900 relative">
//           <Link to="/wishlist">
//             <FaHeart
//               size={24}
//               className="cursor-pointer hover:text-green-600"
//             />
//           </Link>
//           <Link to="/cart">
//             <div className="relative">
//               <FaShoppingCart
//                 size={24}
//                 className="cursor-pointer hover:text-green-600"
//               />
//               {cartItemCount > 0 && (
//                 <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </div>
//           </Link>
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <button className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaUserCircle size={24} />
//               <span>{userName ? userName : "Account"}</span>
//             </button>
//             {/* {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
//                  <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>

//                 <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">My Account</Link>
//                 <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
//                 <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/SignIn")}>Log In</button>
//                 {userName && (
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//                     onClick={handleLogout}
//                   >
//                     Log Out
//                   </button>
//                 )}
//               </div>
//             )} */}
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
//                 <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>{" "}
//                 {/* Display wallet coins */}
//                 {userName ? (
//                   <>
//                     <Link
//                       to="/account"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       My Account
//                     </Link>
//                     <Link
//                       to="/wishlist"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Wishlist
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Orders
//                     </Link>
//                     <button
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//                       onClick={handleLogout}
//                     >
//                       Log Out
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => navigate("/SignIn")}
//                   >
//                     Log In
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaSearch,
//   FaUserCircle,
//   FaHeart,
//   FaShoppingCart,
//   FaBars,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { auth } from "../firebaseConfig";
// import { signOut } from "firebase/auth";
// import logo from "../assets/images/logo.png";
// import Search from "../components/Search";
// import gsap from "gsap";

// // Define navigation links to avoid repetition in JSX
// const navLinks = [
//   { label: "HOME", path: "/" },
//   { label: "SHOP", path: "/shop" },
//   { label: "ABOUT", path: "/about" },
//   { label: "CONTACT", path: "/contact" },
// ];

// const Navbar = () => {
//   // Redux state for cart items and compute total quantity
//   const cartItems = useSelector((state) => state.cart);
//   const cartItemCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   const navigate = useNavigate();

//   // Component state
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [walletCoins, setWalletCoins] = useState(0);
//   const [isNavVisible, setIsNavVisible] = useState(true);

//   // Refs for dropdown delay and navbar container (used by GSAP)
//   const dropdownTimeout = useRef(null);
//   const navContainerRef = useRef(null);

//   /* -------------------------------------------------------------------------
//      User Data & Wallet Coins: Fetch current user info from Firebase and update
//      wallet coins from API based on the user's email.
//   ------------------------------------------------------------------------- */
//   useEffect(() => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       const displayName =
//         currentUser.displayName || currentUser.email.split("@")[0];
//       setUserName(displayName);
//       fetchWalletCoins(currentUser.email);
//     } else {
//       setUserName("");
//       setWalletCoins(0);
//     }
//   }, []);

//   // Async function to fetch wallet coins from the backend API
//   const fetchWalletCoins = async (email) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/auth/coins/${email}`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWalletCoins(data.coins);
//       } else {
//         console.error("Error fetching coins:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching wallet coins:", error);
//     }
//   };

//   // Handle user logout using Firebase signOut
//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUserName("");
//         navigate("/SignIn");
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//       });
//   };

//   // Dropdown event handlers with a slight delay for closing
//   const handleMouseEnter = () => {
//     clearTimeout(dropdownTimeout.current);
//     setIsDropdownOpen(true);
//   };

//   const handleMouseLeave = () => {
//     dropdownTimeout.current = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 300);
//   };

//   /* -------------------------------------------------------------------------
//      Navbar Visibility: Toggle navbar visibility and class based on scroll
//   ------------------------------------------------------------------------- */
//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY === 0) {
//         setIsNavVisible(true);
//         navContainerRef.current?.classList.remove("floating-nav");
//       } else if (currentScrollY > lastScrollY) {
//         setIsNavVisible(false);
//         navContainerRef.current?.classList.add("floating-nav");
//       } else {
//         setIsNavVisible(true);
//         navContainerRef.current?.classList.add("floating-nav");
//       }
//       lastScrollY = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Animate the navbar using GSAP when its visibility changes
//   useEffect(() => {
//     if (navContainerRef.current) {
//       gsap.to(navContainerRef.current, {
//         y: isNavVisible ? 0 : -100,
//         opacity: isNavVisible ? 1 : 0,
//         duration: 0.3,
//       });
//     }
//   }, [isNavVisible]);

//   /* -------------------------------------------------------------------------
//      Render Component
//   ------------------------------------------------------------------------- */
//   return (
//     <nav
//       ref={navContainerRef}
//       className="shadow-md p-4 font-poppins h-20 lg:h-24 pt-6 fixed inset-x-0 transition-all duration-700 z-20 bg-white"
//     >
//       <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
//         {/* Logo & Mobile Menu Toggle */}
//         <div className="relative flex justify-between w-full lg:w-auto items-center mb-4 lg:mb-0">
//           <Link to="/" className="flex items-center">
//             <img
//               src={logo}
//               alt="Logo"
//               className="w-40 h-30 animate-cart-slide-in"
//             />
//           </Link>
//           <div className="flex items-center gap-3 lg:hidden">
//             <Link to="/wishlist">
//               <FaHeart size={20} className="cursor-pointer hover:text-gray-600" />
//             </Link>
//             <Link to="/cart">
//               <div className="relative">
//                 <FaShoppingCart
//                   size={20}
//                   className="cursor-pointer hover:text-gray-600"
//                 />
//                 {cartItemCount > 0 && (
//                   <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </div>
//             </Link>
//             <button
//               onClick={() => setIsMenuOpen((prev) => !prev)}
//               className="text-blue-900 lg:hidden"
//             >
//               <FaBars size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <ul
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } lg:flex flex-col lg:flex-row gap-6 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 text-blue-900 absolute lg:static top-20 left-0 z-50 font-bold`}
//         >
//           {navLinks.map(({ label, path }) => (
//             <li key={path} className="hover:text-green-600">
//               <Link to={path} onClick={() => setIsMenuOpen(false)}>
//                 {label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Search Component */}
//         <div className="w-full lg:w-auto lg:mt-0 flex pt-2 lg:pt-0">
//           <Search />
//         </div>

//         {/* Desktop Icons & Account Dropdown */}
//         <div className="hidden lg:flex items-center gap-6 text-blue-900 relative">
//           <Link to="/wishlist">
//             <FaHeart size={24} className="cursor-pointer hover:text-green-600" />
//           </Link>
//           <Link to="/cart">
//             <div className="relative">
//               <FaShoppingCart
//                 size={24}
//                 className="cursor-pointer hover:text-green-600"
//               />
//               {cartItemCount > 0 && (
//                 <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </div>
//           </Link>
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <button className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaUserCircle size={24} />
//               <span>{userName || "Account"}</span>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
//                 <p className="px-4 py-2">Coins: {walletCoins} 🪙</p>
//                 {userName ? (
//                   <>
//                     <Link
//                       to="/account"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       My Account
//                     </Link>
//                     <Link
//                       to="/wishlist"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Wishlist
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Orders
//                     </Link>
//                     <button
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//                       onClick={handleLogout}
//                     >
//                       Log Out
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     onClick={() => navigate("/SignIn")}
//                   >
//                     Log In
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
