import { Products } from "../../Products/Products";
import "./PromoSection.scss";

export function PromoSection() {
	return (
		<div className="promo">
			<div className="promo__container">
				<h1>Распродажа</h1>
				<div className="promo__products">
					<Products />
				</div>
			</div>
		</div>
	);
}
