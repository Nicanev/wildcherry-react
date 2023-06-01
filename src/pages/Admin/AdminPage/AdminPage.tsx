import React from 'react';
import AdminSidebar from "../../../components/AdminComponents/Sidebar/AdminSidebar";
import AdminHeader from "../../../components/AdminComponents/Header/AdminHeader";
import AdminDashboard from "../../../components/AdminComponents/Dashboard/AdminDashboard";
import AdminUsers from "../../../components/Entity/Tables/Users/AdminUsers";
import AdminProducts from "../../../components/Entity/Tables/Products/AdminProducts";
import "./AdminPage.scss"
import {useLocation} from "react-router-dom";
import CreateUser from "../../../components/Entity/Tables/Users/CreateUser";
import EditUser from "../../../components/Entity/Tables/Users/EditUser";
import AdminCategory from "../../../components/Entity/Tables/Category/AdminCategory";
import AdminSubcategory from "../../../components/Entity/Tables/Subcategory/AdminSubcategory";
import CreateProduct from "../../../components/Entity/Tables/Products/CreateProduct";
import EditProduct from "../../../components/Entity/Tables/Products/EditProduct";

export function AdminPage() {

    const location = useLocation();

    const renderComponent = () => {
        const matchUserRoute = location.pathname.match(/^\/admin\/user\/(\d+)$/);
        const matchProductRoute = location.pathname.match(/^\/admin\/product\/(\d+)$/);
        if (location.pathname === '/admin') {
            return <AdminDashboard/>;
        } else if (location.pathname === '/admin/users') {
            return <AdminUsers/>;
        } else if (location.pathname === '/admin/products') {
            return <AdminProducts/>;
        } else if (location.pathname === '/admin/category') {
            return <AdminCategory/>;
        } else if (location.pathname === '/admin/subcategory') {
            return <AdminSubcategory/>;
        } else if (location.pathname === '/admin/user') {
            return <CreateUser/>
            } else if (location.pathname === '/admin/product') {
            return <CreateProduct/>
        } else if (matchUserRoute) {
            const userId = Number(matchUserRoute[1]);
            return <EditUser userId={userId}/>;
        }
        else if (matchProductRoute) {
            const productId = Number(matchProductRoute[1]);
            return <EditProduct productId={productId}/>;
        }
        return null;
    };
    return (
        <div className="admin-page-container admin__container">
            <AdminSidebar/>
            <div className="admin-page">
                <AdminHeader/>
                <div className="admin-content">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}
