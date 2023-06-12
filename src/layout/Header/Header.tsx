import React, {useContext, useEffect, useState} from "react";
import "./Header.scss";
import {ReactComponent as Logo} from "../../assets/icons/Logo.svg";
import {ReactComponent as Delivery} from "../../assets/icons/Delivery.svg";
import {ReactComponent as Like} from "../../assets/icons/Like.svg";
import {ReactComponent as Cart} from "../../assets/icons/Cart.svg";
import {ReactComponent as User} from "../../assets/icons/User.svg";
import {ModalCatalog} from "../../components/ModalCatalog/ModalCatalog";
import {ReactComponent as Catalog} from "../../assets/icons/Catalog.svg";
import {ReactComponent as Close} from "../../assets/icons/Close.svg";
import {ModalContext} from "../../Context/ModalContext";
import {Link} from "react-router-dom";
import {Search} from "../../components/Search/SearchInput";
import {SearchMobile} from "../../components/Search/SearchMobile";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import config from "../../config";
import axios from "axios";
import parseJwt from "../../jwtUtils";
import {CartContext, CartContextType} from "../../Context/CartContext";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { cartCount, setCartCount } = useContext<CartContextType>(CartContext);


    useEffect(() => {
        fetchCart(setCartCount);
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
            <div className="header__upmenu">
                <div className="header__container">
                    <div className="header__city">Астрахань</div>
                    <div className="header__phone">+7 (695) 556-36-54</div>
                </div>
            </div>
            <div className="header__downmenu">
                <div className="header__container">
                    <MobileMenu/>
                    <Link to="/">
                        <Logo className="header__logo"/>
                    </Link>
                    <CatalogButton/>
                    <div className="header__search">
                        <Search/>
                    </div>
                    <div className="header__buttons">
                        <Link to="/delivery">
                            <button>
                                <Delivery/>
                                <span>Доставка</span>
                            </button>
                        </Link>
                        <Link to='/favourite'>
                            <button>
                                <Like/>
                                <span>Избранное</span>
                            </button>
                        </Link>
                        <Link to="/cart">
                            <button className="header__cart">
                                <Cart/>
                                <span>Корзина</span>
                                <CartBadge count={cartCount}/>
                            </button>
                        </Link>
                        <Link to="/login">
                            <button>
                                <User/>
                                <span>Профиль</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="header__container for-mobile">
                    <div className="header__search-mobile ">
                        <SearchMobile/>
                    </div>
                </div>
            </div>
            <ModalCatalog/>
        </header>
    );
};

function CatalogButton() {
    const {modal, toggle} = useContext(ModalContext);
    const toggleModal = () => {
        toggle();
    };
    return (
        <button onClick={toggleModal} className="catalog">
            {modal ? <Close/> : <Catalog/>}
            <span>Каталог</span>
        </button>
    );
}

interface CartBadgeProps {
    count: number;
}

const fetchCart = async (setCartCount: React.Dispatch<React.SetStateAction<number>>) => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = parseJwt(localStorage.getItem("token"));
    try {
      const response = await axios.get(`${config.apiUrl}/cart/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = response.data.products;
      setCartCount(products.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  } else {
    const guestCart = localStorage.getItem("guestCart");
    if (guestCart) {
      const parsedGuestCart = JSON.parse(guestCart);
      setCartCount(parsedGuestCart.length);
    }
  }
};

const CartBadge: React.FC<CartBadgeProps> = ({ count }) => {
  return (
    <div className={`cart-badge ${count === 0 ? 'hidden' : ''}`}>
      {count > 0 && <div className="cart-badge__count">{count}</div>}
    </div>
  );
};