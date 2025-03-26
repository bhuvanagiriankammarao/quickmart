// import React, { useState } from "react";
// import {
//   MdSwitchAccount,
//   MdOutlinePayment,
// } from "react-icons/md";
// import { FaShoppingCart } from "react-icons/fa";
// import { IoLogOut } from "react-icons/io5";
// import { ImFolderOpen } from "react-icons/im";
// import AddressManagement from "../../pages/Account/AddressMangement";
// import ProfileInformation from "../../pages/Account/ProfileInformation";
// import GiftCard from "../../pages/Account/GiftCardPage";
// import OrderHistory from "../../components/OrderHistory";

// const NAV_ITEMS = [
//   {
//     section: "Account Settings",
//     icon: <MdSwitchAccount className="mr-2 text-xl" />,
//     options: [
//       { label: "Profile Information", component: <ProfileInformation /> },
//       { label: "Manage Addresses", component: <AddressManagement /> },
//       { label: "My Orders", component: <OrderHistory /> },
//     ],
//   },
//   {
//     section: "Payments",
//     icon: <MdOutlinePayment className="mr-2 text-xl" />,
//     options: [
//       { label: "Gift Cards", component: <GiftCard /> },
//     ],
//   },
// ];

// const GreetingPage = () => {
//   return (
//     <div className="text-center bg-green-200 p-6 rounded-lg shadow  mt-24">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, User!</h2>
//       <p className="text-gray-600 mb-6">
//         We're glad to have you here. Use the navigation menu to explore your account settings, manage your orders, and personalize your experience.
//       </p>
//       <img
//         src="src\assets\images\logo.png"
//         alt="Welcome illustration"
//         className="mx-auto rounded-lg"
//       />
//       <p className="mt-6 text-green-600 font-medium">
//         Tip: Keep your profile updated for a personalized experience!
//       </p>
//     </div>
//   );
// };

// const MyAccount = () => {
//   const [activeComponent, setActiveComponent] = useState(null);

//   return (
//     <div className="flex min-h-screen bg-gray-100 font-poppins">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-00 shadow-md p-4">
//         {/* User Info */}
//         <div className="text-center p-4">
//           <img
//             src="https://via.placeholder.com/80"
//             alt="User profile"
//             className="w-20 h-20 rounded-full mx-auto"
//           />
//           <h3 className="mt-2 font-semibold text-lg text-gray-800">
//             Hello, User
//           </h3>
//         </div>

//         {/* Navigation */}
//         <nav className="mt-4 space-y-2">
//           {NAV_ITEMS.map(({ section, icon, options }, index) => (
//             <div key={index}>
//               <div className="flex items-center text-gray-700 font-bold uppercase text-sm mt-4 mb-2 hover:text-green-600 transition duration-300">
//                 {icon}
//                 {section}
//               </div>
//               {options.map(({ label, component }, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setActiveComponent(component)}
//                   className="w-full text-left px-4 py-2 text-gray-600 hover:bg-green-100 hover:text-green-700 rounded transition duration-300"
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>
//           ))}

//           {/* Logout */}
//           <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-red-100 hover:text-red-700 rounded mt-4 flex items-center transition duration-300">
//             Logout
//             <IoLogOut className="ml-2 text-xl" />
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {activeComponent ? activeComponent : <GreetingPage />}
//       </main>
//     </div>
//   );
// };

// export default MyAccount;




import React, { useState } from "react";
import {
  MdSwitchAccount,
  MdOutlinePayment,
} from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { ImFolderOpen } from "react-icons/im";
import AddressManagement from "../../pages/Account/AddressMangement";
import ProfileInformation from "../../pages/Account/ProfileInformation";
import GiftCard from "../../pages/Account/GiftCardPage";
import OrderHistory from "../../components/OrderHistory";

const NAV_ITEMS = [
  {
    section: "Account Settings",
    icon: <MdSwitchAccount className="mr-2 text-xl" />,
    options: [
      { label: "Profile Information", component: <ProfileInformation /> },
      { label: "Manage Addresses", component: <AddressManagement /> },
      { label: "My Orders", component: <OrderHistory /> },
    ],
  },
  {
    section: "Payments",
    icon: <MdOutlinePayment className="mr-2 text-xl" />,
    options: [
      { label: "Gift Cards", component: <GiftCard /> },
    ],
  },
];

const GreetingPage = () => {
  return (
    <div className="text-center bg-green-200 p-6 rounded-lg shadow mt-24">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, User!</h2>
      <p className="text-gray-600 mb-6">
        We're glad to have you here. Use the navigation menu to explore your account settings, manage your orders, and personalize your experience.
      </p>
      <img
        src="src/assets/images/logo.png"
        alt="Welcome illustration"
        className="mx-auto rounded-lg"
      />
      <p className="mt-6 text-green-600 font-medium">
        Tip: Keep your profile updated for a personalized experience!
      </p>
    </div>
  );
};

const MyAccount = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-poppins">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 max-w-xs bg-gray-00 shadow-md p-4">
        {/* User Info */}
        <div className="text-center p-4">
          <img
            src="https://via.placeholder.com/80"
            alt="User profile"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h3 className="mt-2 font-semibold text-lg text-gray-800">
            Hello, User
          </h3>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2">
          {NAV_ITEMS.map(({ section, icon, options }, index) => (
            <div key={index}>
              <div className="flex items-center text-gray-700 font-bold uppercase text-sm mt-4 mb-2 hover:text-green-600 transition duration-300">
                {icon}
                {section}
              </div>
              {options.map(({ label, component }, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveComponent(component)}
                  className="w-full text-left px-4 py-2 text-gray-600 hover:bg-green-100 hover:text-green-700 rounded transition duration-300"
                >
                  {label}
                </button>
              ))}
            </div>
          ))}

          {/* Logout */}
          <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-red-100 hover:text-red-700 rounded mt-4 flex items-center transition duration-300">
            Logout
            <IoLogOut className="ml-2 text-xl" />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        {activeComponent ? activeComponent : <GreetingPage />}
      </main>
    </div>
  );
};

export default MyAccount;
