import "./App.scss";
import {Header} from "./layout/Header/Header";
import {Footer} from "./layout/Footer/Footer";
import {Navigate, Route, Routes} from "react-router-dom";
import {ModalState} from "./Context/ModalContext";
import {MainPage} from "./pages/MainPage";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ProfilePage} from "./pages/ProfilePage";
import {ProductDetailPage} from "./pages/ProductDetailPage";
import {DeliveryPage} from "./pages/DeliveryPage";
import {AdminPage} from "./pages/Admin/AdminPage/AdminPage";
import {CartPage} from "./pages/CartPage";
import {AdminAuthPage} from "./pages/Admin/AdminAuthPage";
import {FavouritePage} from "./pages/FavouritePage";
import {CatalogPage} from "./pages/CatalogPage";
import SearchPage from "./pages/SearchPage";
import {PanelSellerPage} from "./pages/Seller/Profile";
import {useEffect} from "react";
import refreshToken from "./tokenUtils";
import {PaymentPage} from "./pages/PaymentPage";


function RequireAuth(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
}

function App() {
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            refreshToken()
        } else {
            localStorage.clear();
        }
    }, [])
    return (
        <div className="wrapper">
            <ModalState>
                <Header/>
            </ModalState>
            <main className="main">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/product/:id" element={<ProductDetailPage/>}/>
                    <Route path="/search/:search" element={<SearchPage/>}/>
                    {/* Защищенные роуты */}
                    <Route path="/favourite" element={RequireAuth() ? <FavouritePage/> : <Navigate to="/login"/>}/>
                    <Route path="/delivery" element={RequireAuth() ? <DeliveryPage/> : <Navigate to="/login"/>}/>
                    <Route path="/cart" element={RequireAuth() ? <CartPage/> : <Navigate to="/login"/>}/>

                    <Route path="/catalog" element={<CatalogPage/>}/>
                    <Route path="/catalog/:category" element={<CatalogPage/>}/>

                    {/* Защищенный роут */}
                    <Route path="/admin/*" element={RequireAuth() ? <AdminPage/> : <Navigate to="/admin-auth"/>}/>
                    <Route path="/admin-auth" element={<AdminAuthPage/>}/>
                    <Route path="/seller/*" element={RequireAuth() ? <PanelSellerPage/> : <Navigate to="/login"/>}/>
                    <Route path="/payment" element={<PaymentPage/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
