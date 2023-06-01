import {Link, useLocation} from "react-router-dom";
import "./Seller.scss"
import React from "react";
import SellerProducts from "../../components/Entity/Products/SellerProducts";
import {SellerAuthPage} from "./AuthPage";
import CreateProduct from "../../components/Entity/Products/CreateProduct";
import EditProduct from "../../components/Entity/Products/EditProduct";
import {SellerPanel} from "../../components/SellerComponents/SellerPanel";
import SellerDiscount from "../../components/Entity/Discount/SellerDiscount";

export function PanelSellerPage() {
    const location = useLocation();

    const renderComponent = () => {
        const matchProductRoute = location.pathname.match(/^\/seller\/product\/(\d+)$/);
        if (location.pathname === '/seller') {
            return <SellerPanel/>;
        } else if (location.pathname === '/seller/products') {
            return <SellerProducts/>;
        } else if (location.pathname === '/seller/product') {
            return <CreateProduct/>;
        } else if (location.pathname === '/seller/discounts') {
            return <SellerDiscount/>;
        } else if (matchProductRoute) {
            const productId = Number(matchProductRoute[1]);
            return <EditProduct productId={productId}/>;
        }
        return null;
    }
    return <>
        <div className="profile-seller">
            <div className="profile-seller__container">
                <h1>Панель продавца</h1>
                <div className="profile-seller__btn">
                    <Link to="/seller/products">
                        <button className={location.pathname === '/seller/products' ? 'active' : ''}>Продукты</button>
                    </Link>
                    <Link to="/seller/discounts">
                        <button className={location.pathname === '/seller/discounts' ? 'active' : ''}>Акции</button>
                    </Link>
                </div>
                {renderComponent()}
            </div>
        </div>
    </>
}