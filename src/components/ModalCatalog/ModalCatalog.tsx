import React, {useContext, useState} from "react";
import {ModalContext} from "../../Context/ModalContext";
import "./ModalCatalog.scss";
import {Transition} from "react-transition-group";
import {Link} from "react-router-dom";

export const ModalCatalog = () => {
    const {modal} = useContext(ModalContext);
    const [selectedCategory, setSelectedCategory] = useState('electronic');

    const handleCategoryHover = (category: any) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <Transition in={modal} timeout={300}>
                {(state) => (
                    <div className={`modalCatalog ${state}`}>
                        <div className="modalCatalog__container">
                            <ul className="modalCatalog__categories">
                                <li onMouseEnter={() => handleCategoryHover('electronic')}>Электроника</li>
                                <li onMouseEnter={() => handleCategoryHover('clothes')}>Одежда</li>
                                <li onMouseEnter={() => handleCategoryHover('shoes')}>Обувь</li>
                                <li onMouseEnter={() => handleCategoryHover('furniture')}>Мебель</li>
                            </ul>
                            <ul className={`modalCatalog__subcategories ${selectedCategory}`}>
                                {selectedCategory === 'electronic' && (
                                    <>
                                        <li><b> Компьютерные комлектующие</b></li>
                                        <Link to={'/catalog/Видеокарты'}>
                                            <li>Видеокарты</li>
                                        </Link>
                                        <li>Мониторы</li>
                                        <li>ОЗУ</li>
                                        <li>Клавиатуры</li>
                                    </>
                                )}
                                {selectedCategory === 'clothes' && (
                                    <>
                                        <li>Одежда</li>
                                        <li>Обувь</li>
                                        <li>Куртки</li>
                                        <li>Штаны</li>
                                        <li>Рубашки</li>
                                    </>
                                )}
                                {selectedCategory === 'shoes' && (
                                    <>
                                        <li>Кроссовки</li>
                                        <li>Ботинки</li>
                                        <li>Сандалии</li>
                                        <li>Туфли</li>
                                        <li>Сапоги</li>
                                    </>
                                )}
                                {selectedCategory === 'furniture' && (
                                    <>
                                        <li>Стулья</li>
                                        <li>Столы</li>
                                        <li>Шкафы</li>
                                        <li>Кровати</li>
                                        <li>Полки</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    );
};
