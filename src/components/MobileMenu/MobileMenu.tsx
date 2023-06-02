import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as BurgerIcon} from "../../assets/icons/burger.svg";
import "./mobileMenu.scss"
import {Transition} from "react-transition-group";

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const duration = 300;

    const defaultStyle = {
        transition: `transform ${duration}ms ease-in-out`,
        transform: "translateX(-100%)",
    };

    const transitionStyles = {
        entering: {transform: "translateX(0%)"},
        entered: {transform: "translateX(0%)"},
        exiting: {transform: "translateX(-100%)"},
        exited: {transform: "translateX(-100%)"},
        unmounted: {transform: "translateX(-100%)"},
    };


    return (
        <>
            <div className="header__burger" onClick={toggleMenu}>
                <BurgerIcon/>
            </div>
            <Transition in={isOpen} timeout={duration}>
                {(state) => (
                    <div
                        className="mobile-menu" ref={menuRef}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    >
                        <ul>
                            <li>
                                <a href="/catalog">Каталог</a>
                            </li>
                            <li>
                                <a>О нас</a>
                            </li>
                        </ul>
                    </div>
                )}
            </Transition>
        </>
    );
};

export default MobileMenu;
