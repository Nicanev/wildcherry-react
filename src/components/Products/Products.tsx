import ProductImg from "../../assets/img/products/Nothing_Phone_1.jpg";
import "./Products.scss";
import { ReactComponent as Star } from "../../assets/icons/Star.svg";

export function Products() {
	return (
		<div className="products">
			<ul className="products__list">
				<li className="product__card card">
					<div className="card__img">
						<img src={ProductImg} alt="Product" />
					</div>
					<div className="card__body">
						<div className="card__price">
							<div className="card__current-price">41 613 ₽</div>
							<div className="card__old-price">49 900 ₽</div>
						</div>
						<div className="card__title">
							Смартфон Nothing Nothing Phone 1 8/256 ГБ
						</div>
						<div className="card__rating">
							<div className="card__rating-stars">
								<Star className="star-full" />
								<Star className="star-full" />
								<Star className="star-full" />
								<Star className="star-full" />
								<Star />
							</div>
							<span>1 336</span>
						</div>
						<button className="card__btn">В корзину</button>
					</div>
				</li>
			</ul>
		</div>
	);
}
