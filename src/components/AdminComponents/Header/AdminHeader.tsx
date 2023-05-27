import React from 'react';

interface AdminHeaderProps {
  // Пропсы, если необходимо
}

const AdminHeader: React.FC<AdminHeaderProps> = () => {
  return (
    <div className="admin-header">
      <div className="admin-header__logo">
        {/* Компонент или изображение логотипа */}
        <img src="@/icons/Logo.svg" alt="Admin Logo" />
      </div>
      <div className="admin-header__title">
        <h1>Admin Panel</h1>
      </div>
      <div className="admin-header__actions">
        {/* Кнопки или другие действия */}
        <button>Logout</button>
        <button>Settings</button>
      </div>
    </div>
  );
};

export default AdminHeader;
