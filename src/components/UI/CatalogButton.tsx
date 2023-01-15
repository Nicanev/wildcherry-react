import React from "react";
import style from "./UI.module.scss";
import { ReactComponent as Catalog } from "../../assets/icons/Catalog.svg";

interface CatalogButtonProps {
	text: string;
	openCatalog: Function;
}

export const CatalogButton = ({ text, openCatalog }: CatalogButtonProps) => {
	return (
		<button onClick={() => openCatalog(1)} className={style.catalog}>
			<Catalog />
			<span>{text}</span>
		</button>
	);
};
