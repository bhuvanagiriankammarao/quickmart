// import React from 'react';
// import { RiAdminFill } from "react-icons/ri";
// import { MdOutlineDashboardCustomize } from "react-icons/md";
// import { FaBagShopping } from "react-icons/fa6";
// import { PiShoppingBagFill } from "react-icons/pi";
// import { useNavigate } from 'react-router-dom';

// const adminSidebarMenuItems = [
//     {
//         id: "dashboard",
//         label: "Dashboard",
//         path: "/admin/dashboard",
//         icon: <MdOutlineDashboardCustomize />,
//     },
//     {
//         id: "products",
//         label: "Products",
//         path: "/admin/products",
//         icon: <FaBagShopping />,
//     },
//     {
//         id: "orders",
//         label: "Orders",
//         path: "/admin/orders",
//         icon: <PiShoppingBagFill />,
//     },
// ];

// function MenuItems({ setOpen }) {
//     const navigate = useNavigate();

//     return (
//         <nav className="mt-8 flex-col flex gap-2">
//             {adminSidebarMenuItems.map((menuItem) => (
//                 <div
//                     key={menuItem.id}
//                     onClick={() => {
//                         navigate(menuItem.path);
//                         setOpen && setOpen(false);
//                     }}
//                     className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-gray-100"
//                 >
//                     {menuItem.icon}
//                     <span>{menuItem.label}</span>
//                 </div>
//             ))}
//         </nav>
//     );
// }

// const AdminSideBar = ({ open, setOpen }) => {
//     return (
//         <aside
//             className={`${
//                 open ? 'block' : 'hidden lg:flex'
//             } fixed inset-0 z-20 lg:z-auto lg:relative lg:w-64 flex-col border-r bg-background p-6`}
//             onClick={() => setOpen(false)}
//         >
//             <div className="flex items-center pl-5 gap-2">
//                 <RiAdminFill size={20} />
//                 <h1 className="text-2xl font-extrabold">Admin Panel</h1>
//             </div>
//             <MenuItems setOpen={setOpen} />
//         </aside>
//     );
// };

// export default AdminSideBar;































import React from 'react';
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { PiShoppingBagFill } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdCategory } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";

const adminSidebarMenuItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: <MdOutlineDashboardCustomize /> },
    { id: "products", label: "Products", path: "/admin/products", icon: <FaBagShopping /> },
    { id: "categories", label: "Categories", path: "/admin/categories", icon: <MdCategory /> },
    { id: "orders", label: "Orders", path: "/admin/orders", icon: <PiShoppingBagFill /> },
    { id: "team", label: "Team", path: "/admin/myteam", icon: <AiOutlineTeam /> },
    { id: "calender", label: "Calender", path: "/admin/calendar", icon: <FaRegCalendarAlt /> },
];

const MenuItems = ({ setOpen }) => {
    const navigate = useNavigate();

    return (
        <nav className="mt-8 flex flex-col gap-2">
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen && setOpen(false);
                    }}
                    className="flex cursor-pointer text-xl items-center gap-2
                     rounded-md 
                    px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-purple-700"
                >
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
};

const AdminSideBar = ({ open, setOpen }) => {
    return (
        <aside
            className={`${
                open ? 'block' : 'hidden lg:flex'
            } fixed inset-0 z-20 lg:z-auto lg:relative lg:w-64 flex-col border-r
             bg-white text-gray-700 p-6`}
            onClick={() => setOpen(false)}
        >
            <div className="flex items-center gap-2 pl-5">
                <RiAdminFill size={24} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
            </div>
            <MenuItems setOpen={setOpen} />
        </aside>
    );
};

export default AdminSideBar;
