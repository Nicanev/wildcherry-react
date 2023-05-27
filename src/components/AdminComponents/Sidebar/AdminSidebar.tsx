import React from 'react';

interface AdminSidebarProps {
  // Пропсы, если необходимо
}

const AdminSidebar: React.FC<AdminSidebarProps> = () => {
  return (
    <div className="admin-sidebar">
      <ul className="admin-sidebar__nav">
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/users">Users</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/orders">Orders</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
