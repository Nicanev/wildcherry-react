import React, { useContext } from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../assets/icons/Logo.svg";
import { ReactComponent as Loop } from "../../assets/icons/Loop.svg";
import { ReactComponent as Delivery } from "../../assets/icons/Delivery.svg";
import { ReactComponent as Like } from "../../assets/icons/Like.svg";
import { ReactComponent as Cart } from "../../assets/icons/Cart.svg";
import { ReactComponent as User } from "../../assets/icons/User.svg";
import { ModalCatalog } from "../ModalCatalog/ModalCatalog";
import { ReactComponent as Catalog } from "../../assets/icons/Catalog.svg";
import { ReactComponent as Close } from "../../assets/icons/Close.svg";
import { ModalContext } from "../../Context/ModalContext";
import { Link } from "react-router-dom";
import { ReactComponent as Burger } from "../../assets/icons/burger.svg";
import { Search } from "../Search/SearchInput";

export const Header = () => {
	return (
		<header className="header">
			<div className="header__upmenu">
				<div className="header__container">
					<div className="header__city">Астрахань</div>
					<div className="header__phone">+7 (695) 556-36-54</div>
				</div>
			</div>
			<div className="header__downmenu">
				<div className="header__container">
					<Burger className="header__burger" />
					<Link to="/">
						<Logo className="header__logo" />
					</Link>
					<CatalogButton />
					<div className="header__search">
						<Search />
					</div>
					<div className="header__buttons">
						<button>
							<Delivery />
							<span>Доставка</span>
						</button>
						<button>
							<Like />
							<span>Избранное</span>
						</button>
						<button>
							<Cart />
							<span>Корзина</span>
						</button>
						<Link to="/login">
							<button>
								<User />
								<span>Профиль</span>
							</button>
						</Link>
					</div>
				</div>
				<div className="header__container for-mobile">
					<div className="header__search-mobile ">
						<Loop />
						<input type="text" placeholder="Поиск" />
					</div>
				</div>
			</div>
			<ModalCatalog />
		</header>
	);
};

function CatalogButton() {
	const { modal, toggle } = useContext(ModalContext);
	const toggleModal = () => {
		toggle();
	};
	return (
		<button onClick={toggleModal} className="catalog">
			{modal ? <Close /> : <Catalog />}
			<span>Каталог</span>
		</button>
	);
}
