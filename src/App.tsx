import "./App.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { ModalState } from "./Context/ModalContext";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ResultPage } from "./pages/ResultPage";

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
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
