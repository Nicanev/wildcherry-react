import React from 'react';
import AdminSidebar from "../../../components/AdminComponents/Sidebar/AdminSidebar";
import AdminHeader from "../../../components/AdminComponents/Header/AdminHeader";
import AdminDashboard from "../../../components/AdminComponents/Dashboard/AdminDashboard";
import AdminUsers from "../../../components/AdminComponents/Tables/Users/AdminUsers";
import AdminProducts from "../../../components/AdminComponents/Tables/Products/AdminProducts";
import "./AdminPage.scss"
import {useLocation} from "react-router-dom";
import CreateUser from "../../../components/AdminComponents/Tables/Users/CreateUser";
import EditUser from "../../../components/AdminComponents/Tables/Users/EditUser";

export function AdminPage() {

    const location = useLocation();

    const renderComponent = () => {
        const matchUserRoute = location.pathname.match(/^\/admin\/user\/(\d+)$/);
        if (location.pathname === '/admin') {
            return <AdminDashboard/>;
        } else if (location.pathname === '/admin/users') {
            return <AdminUsers/>;
        } else if (location.pathname === '/admin/products') {
            return <AdminProducts/>;
        } else if (location.pathname === '/admin/user') {
            return <CreateUser/>
        } else if (matchUserRoute) {
            const userId = Number(matchUserRoute[1]);
            return <EditUser userId={userId}/>;
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
