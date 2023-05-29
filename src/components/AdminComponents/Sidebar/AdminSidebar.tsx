import React from 'react';
import "./AdminSidebar.scss"

interface AdminSidebarProps {
    // Пропсы, если необходимо
}

const AdminSidebar: React.FC<AdminSidebarProps> = () => {
    return (
        <div className="admin-sidebar">
            <ul className="admin-sidebar__nav">
                <li>
                    <a href="/admin">Дашборд</a>
                </li>
                <li>
                    <a href="/admin/users">Пользователи</a>
                </li>
                <li>
                    <a href="/admin/products">Продукты</a>
                </li>
                <li>
                    <a href="/admin/category">Категории</a>
                </li>
                <li>
                    <a href="/admin/subcategory">Подкатегории</a>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
