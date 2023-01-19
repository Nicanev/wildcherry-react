import React from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { ModalState } from "./Context/ModalContext";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { removeUser, setUser } from "./store/slices/userSlice";
import { useAppDispatch } from "./hooks/redux-hooks";

// const currentPage = router;

function App() {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(
				setUser({
					email: user.email,
					id: user.uid,
					token: user.refreshToken,
				})
			);
		} else {
			removeUser();
		}
	});
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
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
