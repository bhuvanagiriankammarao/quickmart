import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../Admin/Pages/Dashboard';
import Products from '../Admin/Pages/Products';
import Orders from '../Admin/Pages/Order';
import AdminLayout from '../section/Admin-Section/AdminLayout';
import CalendarPage from '../Admin/Pages/CalendarPage';
import Categories from '../Admin/Pages/Categories';

import Chat from '../Admin/Pages/Chat';
import UserManagement from '../Admin/Pages/UserManagement';
import Voucher from '../Admin/Pages/Voucher';

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
        <Route path="/chat" element={<Chat/>} />
        <Route path="/users" element={<UserManagement/>} />
        <Route path="/voucher" element={<Voucher/>} />
        
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
