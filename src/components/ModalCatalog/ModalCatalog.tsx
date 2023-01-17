import React, { useContext } from "react";
import { ModalContext } from "../../Context/ModalContext";
import "./ModalCatalog.scss";
import { Transition } from "react-transition-group";

export const ModalCatalog = () => {
	const { modal } = useContext(ModalContext);
	return (
		<>
			<Transition in={modal} timeout={300}>
				{(state) => (
					<div className={`modalCatalog ${state}`}>
						<div className="modalCatalog__container">
							<ul className="modalCatalog__categories">
								<li>Электроника</li>
								<li>Одежда</li>
								<li>Обувь</li>
								<li>Мебель</li>
							</ul>
							<ul className="modalCatalog__subcategories">
								<li>Телефоны и смарт-часы</li>
								<li>Смартфоны</li>
								<li>Смарт-часы</li>
								<li>Ассексуары</li>
								<li>Фитнес браслеты</li>
							</ul>
						</div>
					</div>
				)}
			</Transition>
		</>
	);
};
