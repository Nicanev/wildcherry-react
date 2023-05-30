import React, {useContext, useState} from "react";
import { ModalContext } from "../../Context/ModalContext";
import "./ModalCatalog.scss";
import { Transition } from "react-transition-group";

export const ModalCatalog = () => {
  const { modal } = useContext(ModalContext);
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
                    <li>Телефоны и смарт-часы</li>
                    <li>Смартфоны</li>
                    <li>Смарт-часы</li>
                    <li>Аксессуары</li>
                    <li>Фитнес-браслеты</li>
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
              </ul>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};
