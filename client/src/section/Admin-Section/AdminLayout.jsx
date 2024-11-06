// import React, { useState } from 'react';

// import AdminSideBar from '../../components/AdminSideBar';
// import AdminHeader from '../../components/AdminHeader';


// const AdminLayout = ({ children }) => {
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="flex h-screen">
//             {/* Sidebar */}
//             <AdminSideBar open={open} setOpen={setOpen} />
            
//             {/* Main content area */}
//             <div className="flex flex-1 flex-col">
//                 <AdminHeader   setOpen={setOpen} />
//                 <main className="flex-1 p-4 overflow-auto">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;











import React, { useState } from 'react';
import AdminSideBar from '../../components/AdminSideBar';
import AdminHeader from '../../components/AdminHeader';

const AdminLayout = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <AdminSideBar open={open} setOpen={setOpen} />
            <div className="flex flex-1 flex-col">
                <AdminHeader setOpen={setOpen} />
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
