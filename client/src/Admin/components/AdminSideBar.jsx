import React from 'react';
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineDashboardCustomize, MdClose } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { PiShoppingBagFill } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { MdCategory } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa6";
import { FaPercentage } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";


const adminSidebarMenuItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: <MdOutlineDashboardCustomize /> },
    { id: "products", label: "Products", path: "/admin/products", icon: <FaBagShopping /> },
    { id: "categories", label: "Categories", path: "/admin/categories", icon: <MdCategory /> },
    { id: "subcategories", label: "SubCategories", path: "/admin/subcategories", icon: <FaShoppingBasket /> },
    { id: "orders", label: "Orders", path: "/admin/orders", icon: <PiShoppingBagFill /> },
    { id: "usermanagement", label: "Users", path: "/admin/users", icon: <FaUserShield /> },
    { id: "voucher", label: "Voucher", path: "/admin/voucher", icon: <FaPercentage /> },
    // { id: "banner", label: "Banner", path: "/admin/banner", icon: <BsImageFill /> },
    // { id: "chat", label: "Chat", path: "/admin/chat", icon: <AiOutlineTeam /> },
    { id: "paymentdetails", label: "PaymentDetails", path: "/admin/payment-details", icon: <MdOutlinePayment /> },
    // { id: "calendar", label: "Calendar", path: "/admin/calendar", icon: <FaRegCalendarAlt /> },
];

const MenuItems = ({ setOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="mt-8 flex flex-col gap-2 font-poppins">
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen && setOpen(false);
                    }}
                    className={`flex cursor-pointer text-xl items-center gap-2
                        rounded-md px-3 py-2 
                        ${location.pathname === menuItem.path 
                            ? 'bg-gray-200 text-purple-700' 
                            : 'text-gray-500 hover:bg-gray-100 hover:text-purple-700'
                        }`}
                >
                    {menuItem.icon}
                    <span className=' max-md:text-base'>{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
};

const AdminSideBar = ({ open, setOpen }) => {
    return (
        <aside
            className={`fixed inset-0 z-20 transform bg-white text-gray-700 border-r
                transition-transform lg:relative lg:transform-none lg:w-64
                ${open ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            {/* Sidebar Header */}
            <div className="flex items-center gap-5 p-[14px] border-b">
            <button
                    className="lg:hidden text-gray-600 hover:text-gray-900"
                    onClick={() => setOpen(false)}
                >
                    <MdClose size={24} />
                </button>
                <div className="flex items-center gap-2">
                    <RiAdminFill size={24} />
                    <h1 className=" text-2xl font-extrabold
                     max-lg:text-lg">Admin Panel</h1>
                </div>

            </div>
            {/* Sidebar Menu */}
            <MenuItems setOpen={setOpen} />
        </aside>
    );
};

export default AdminSideBar;
