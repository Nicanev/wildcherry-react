import "./Product.scss";
import { ReactComponent as Like } from "../../assets/icons/Like.svg";
import { Rating } from "../Reviews/Rating";

interface ProductProps {
	product: any;
	category: any;
	productID: any;
}

export function ProductDetail({ product, category, productID }: ProductProps) {
	let date = new Date();

	return (
		<div className="product">
			<div className="product__container">
				<div className="product__head">
					<div className="product__title">{product?.title}</div>
					<div className="product__rate">
						<Rating productID={productID} />
					</div>
				</div>

				<div className="product__main">
					<img
						src={product?.image}
						alt={product?.title}
						className="product__img"
					/>
					<div className="product__price-block">
						<div className="product__oldprice">{product?.price} ₽</div>
						<div className="product__price">{product?.price} ₽</div>
						<div className="product__delivery">
							Доставим в пункт выдачи{" "}
							<span>{`${date.getDate() + 3}-${
								date.getDate() + 5
							} ${date.toLocaleString("ru", { month: "short" })}`}</span>
						</div>
						<div className="product__buttons">
							<button>В корзину</button>
							<button>Купить сейчас</button>
							<button>
								<Like />
							</button>
						</div>
					</div>
				</div>
				<div className="product__description">
					<div className="product__text">
						<h1>Описание</h1>
						<p>{product?.description}</p>
					</div>
					<div className="product__additional">
						<h1>Характеристики</h1>
						<p>{product?.additional}</p>
						<p>{category?.additional}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
