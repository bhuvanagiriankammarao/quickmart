// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from '../pages/Admin/Dashboard';

// import AdminLayout from '../section/Admin-Section/AdminLayout';


// const AdminRoutes = () => {
//   return (
//     <>
//     <AdminLayout/>
     
//       <Routes>
//         <Route path="/dashboard" element={<Dashboard />} /> {/* Matches /admin */}
//         {/* Add other admin routes like /admin/settings, /admin/users here */}
       
       
//       </Routes>
//     </>
//   );
// };

// export default AdminRoutes;






















// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from '../pages/Admin/Dashboard';
// import Products from '../pages/Admin/Products';
// import Orders from '../../src/pages/Admin/Order';
// import AdminLayout from '../section/Admin-Section/AdminLayout';

// const AdminRoutes = () => {
//   return (
//     <AdminLayout>
//       <Routes>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/orders" element={<Orders />} />
//       </Routes>
//     </AdminLayout>
//   );
// };

// export default AdminRoutes;























import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../Admin/Dashboard';
import Products from '../Admin/Products';
import Orders from '../Admin/Order';
import AdminLayout from '../section/Admin-Section/AdminLayout';
import CalendarPage from '../Admin/CalendarPage';
import Categories from '../Admin/Categories';
import Team from '../Admin/Team';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/myteam" element={<Team />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
