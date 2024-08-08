// src/pages/Admin2Page.js
import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

const Admin1Page = () => {
  return (
    <div className="p-4 sm:p-8 bg-transparent min-h-screen">
      <h1 className="text-2xl font-bold">Página de Admin 1</h1>
      <AdminDashboard adminId="admin1" />
    </div>
  );
};

export default Admin1Page;
