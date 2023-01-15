import React, { useState } from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../assets/icons/Logo.svg";
import { ReactComponent as Loop } from "../../assets/icons/Loop.svg";
import { ReactComponent as Delivery } from "../../assets/icons/Delivery.svg";
import { ReactComponent as Like } from "../../assets/icons/Like.svg";
import { ReactComponent as Cart } from "../../assets/icons/Cart.svg";
import { ReactComponent as User } from "../../assets/icons/User.svg";
import { CatalogButton } from "../UI/CatalogButton";
import { ModalCatalog } from "../ModalCatalog/ModalCatalog";
import { CSSTransition } from "react-transition-group";

export const Header = () => {
	let [ModalStatus, setModalStatus] = useState(false);
	const toggleModal = () => {
		setModalStatus((ModalStatus = !ModalStatus));
	};
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
					<Logo className="header__logo" />
					<CatalogButton
						toggle={toggleModal}
						isOpen={ModalStatus}
						text={"Каталог"}
					/>
					<div className="header__search">
						<input type="text" />
						<button>
							<Loop />
						</button>
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
						<button>
							<User />
							<span>Профиль</span>
						</button>
					</div>
				</div>
			</div>
			<CSSTransition in={ModalStatus} timeout={400} classNames="example">
				<ModalCatalog isOpen={ModalStatus} />
			</CSSTransition>
		</header>
	);
};
