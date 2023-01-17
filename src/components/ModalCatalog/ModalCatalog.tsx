import React from "react";
import "./ModalCatalog.scss";

export const ModalCatalog = () => {
	return (
		<>
			<div className="modalCatalog">
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
		</>
	);
};
