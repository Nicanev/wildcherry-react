import { Products } from "../../Products/Products";
import "./PromoSection.scss";

export function PromoSection() {
	return (
		<div className="promo">
			<div className="promo__container">
				<h2>Распродажа</h2>
				<div className="promo__products">
					<Products />
				</div>
			</div>
		</div>
	);
}
