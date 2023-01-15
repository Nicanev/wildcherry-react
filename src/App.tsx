import React from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const currentPage = router;

function App() {
	return (
		<div className="wrapper">
			<Header />
			<RouterProvider router={currentPage} />
			<Footer />
		</div>
	);
}

export default App;
