import React from 'react';
import { FaBars } from "react-icons/fa";
import { FiLogOut, FiBell, FiMail } from "react-icons/fi"; 
import { Avatar } from '../../assets/images/admin';
import { Link } from 'react-router-dom';

const AdminHeader = ({ setOpen }) => {
    return (
        <header className="flex items-center justify-between px-4 py-3
          text-black border-b cursor-pointer bg-gray-100 font-poppins">
            {/* Menu Toggle Button */}
            <button className="lg:hidden" onClick={() => setOpen(prev => !prev)}>
                <FaBars size={20} />
                <span className="sr-only">Toggle Menu</span>
            </button>
            
            {/* Right Aligned Icons and Profile Section */}
            <div className="flex items-center gap-4 ml-auto">
                {/* Notification Icon with Badge */}
                <div className="relative">
                    <FiBell size={24} />
                    <span className="absolute top-0 
                    right-0 h-3 w-3 rounded-full bg-blue-500 text-xs
                     text-white flex items-center justify-center">
                        2
                    </span>
                </div>

                {/* Message Icon with Badge */}
                <div className="relative">
                    <FiMail size={24} />
                    <span className="absolute top-0 right-0 h-3 w-3 
                    rounded-full bg-blue-500 text-xs
                     text-white flex items-center justify-center">
                        2
                    </span>
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-500 
                    rounded-full">
                          <img
              className="rounded-full w-8 h-8"
              src={Avatar}
              alt="user-profile"
            /></div> {/* Placeholder for profile picture */}
                    <div>
                        <p className="text-sm font-medium">Pavan sai</p>
                        <p className="text-xs text-gray-400">Manager</p>
                    </div>
                </div>
                
                {/* Log Out Button */}
                <Link to="/">
                <button className="flex items-center gap-1 rounded-md px-4 py-2 text-sm 
                font-medium bg-gray-200 hover:bg-gray-300">
                    <span>Log Out</span>
                    <FiLogOut size={20} />
                </button>
                </Link>
            </div>
        </header>
    );
};

export default AdminHeader;
