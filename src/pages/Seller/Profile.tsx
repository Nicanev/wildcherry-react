import {Link} from "react-router-dom";

export function PanelSellerPage() {
    return <>
        <div className="profile-seller">
            <div className="profile-seller__container">
                <h1>Панель продавца</h1>
                <div className="profile-seller__block">
                    <Link to="/seller/products">
                        <button>Продукты</button>
                    </Link>
                    <button>Скидки</button>
                </div>
            </div>
        </div>


    </>
}