import React from "react";
import "./ModalCatalog.scss";

interface ModalCatalogProps {
	isOpen: boolean;
}

export const ModalCatalog = ({ isOpen }: ModalCatalogProps) => {
	return (
		<React.Fragment>
			{isOpen && (
				<div className="modalCatalog">
					<div className="modalCatalog__container">
						<h1>ТЕСТЫ</h1>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};
