import "./Products.scss";
import { Link } from "react-router-dom";
import { Rating } from "../Reviews/Rating";

interface ProductsProps {
	products: any;
}

export function ProductsList({ products }: ProductsProps) {
	return (
		<div className="products">
			<ul className="products__list">
				{products?.map((product: any) => {
					return (
						<li key={product.id} className="product__card card">
							<div className="card__img">
								<img src={product.image} alt="Product" />
							</div>
							<div className="card__body">
								{/*<div className="card__price">*/}
								{/*	<div className="card__current-price">*/}
								{/*		{Math.round(*/}
								{/*			(product.price / 100) * product.discount*/}
								{/*		).toLocaleString()}{" "}*/}
								{/*		₽*/}
								{/*	</div>*/}
								{/*	<div className="card__old-price">*/}
								{/*		{product.price.toLocaleString()} ₽*/}
								{/*	</div>*/}
								{/*</div>*/}
								<div className="card__price">
									<div className="card__current-price">
										{product.price.toLocaleString()} ₽
									</div>
								</div>
								<Link to={`/product/${product.id}`}>
									<div className="card__title">{product.name}</div>
								</Link>
								<div className="card__rating">
									<Rating score={product.score} count_score={product.count_score} />
								</div>
								<button className="card__btn">В корзину</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
