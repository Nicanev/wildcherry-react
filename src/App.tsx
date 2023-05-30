import "./App.scss";
import { Header } from "./layout/Header/Header";
import { Footer } from "./layout/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { ModalState } from "./Context/ModalContext";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ResultPage } from "./pages/ResultPage";
import {DeliveryPage} from "./pages/DeliveryPage";
import {AdminPage} from "./pages/Admin/AdminPage/AdminPage";
import {CartPage} from "./pages/CartPage";
import {AdminAuthPage} from "./pages/Admin/AdminAuthPage";
import {FavouritePage} from "./pages/FavouritePage";


// const currentPage = router;

function App() {
	return (
		<div className="wrapper">
			<ModalState>
				<Header />
			</ModalState>
			<main className="main">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/product/:id" element={<ProductDetailPage />} />
					<Route path="/search/:search" element={<ResultPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/delivery" element={<DeliveryPage />} />
					<Route path="/admin/*" element={<AdminPage />} />
					<Route path="/favourite" element={<FavouritePage />} />
					<Route path="/admin-auth" element={<AdminAuthPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
