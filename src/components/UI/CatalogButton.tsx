import React from "react";
import style from "./UI.module.scss";
import { ReactComponent as Catalog } from "../../assets/icons/Catalog.svg";
import { ReactComponent as Close } from "../../assets/icons/Close.svg";

interface CatalogButtonProps {
	text: string;
	isOpen: boolean;
	toggle: Function;
}

export const CatalogButton = ({ text, isOpen, toggle }: CatalogButtonProps) => {
	return (
		<button onClick={() => toggle()} className={style.catalog}>
			{isOpen ? <Close /> : <Catalog />}

			<span>{text}</span>
		</button>
	);
};
