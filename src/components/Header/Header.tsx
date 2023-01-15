import React from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../assets/icons/Logo.svg";
import { ReactComponent as Loop } from "../../assets/icons/Loop.svg";
import { ReactComponent as Delivery } from "../../assets/icons/Delivery.svg";
import { ReactComponent as Like } from "../../assets/icons/Like.svg";
import { ReactComponent as Cart } from "../../assets/icons/Cart.svg";
import { ReactComponent as User } from "../../assets/icons/User.svg";
import { CatalogButton } from "../UI/CatalogButton";

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
					<Logo className="header__logo" />
					<CatalogButton openCatalog={() => alert("test")} text={"Каталог"} />
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
		</header>
	);
};
