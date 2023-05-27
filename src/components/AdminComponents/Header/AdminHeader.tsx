import React from 'react';
// import {ReactComponent as Logo} from "../../../assets/icons/Logo.svg";
import "./AdminHeader.scss"

interface AdminHeaderProps {
  // Пропсы, если необходимо
}

const AdminHeader: React.FC<AdminHeaderProps> = () => {
  return (
    <div className="admin-header">
      {/*<div className="admin-header__logo">*/}
      {/*  <Logo className="admin-header__logo" />*/}
      {/*</div>*/}
      <div className="admin-header__title">
        <h1>Панель администратора</h1>
      </div>
      <div className="admin-header__actions">
        {/* Кнопки или другие действия */}

      </div>
    </div>
  );
};

export default AdminHeader;
