import React from 'react';
import AdminSidebar from "../../components/AdminComponents/Sidebar/AdminSidebar";
import AdminHeader from "../../components/AdminComponents/Header/AdminHeader";
import AdminDashboard from "../../components/AdminComponents/Dashboard/AdminDashboard";
import AdminUsers from "../../components/AdminComponents/Users/AdminUsers";
import AdminProducts from "../../components/AdminComponents/Products/AdminProducts";

export function AdminPage() {
  return (
    <>
      <AdminSidebar />
      <div className="admin-page">
        <AdminHeader />
        <div className="admin-content">
          <AdminDashboard />
          <AdminUsers />
          <AdminProducts />
        </div>
      </div>
    </>
  );
}
