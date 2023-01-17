import React from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ModalState } from "./Context/ModalContext";

const currentPage = router;

function App() {
	return (
		<div className="wrapper">
			<ModalState>
				<Header />
			</ModalState>
			<RouterProvider router={currentPage} />
			<Footer />
		</div>
	);
}

export default App;
