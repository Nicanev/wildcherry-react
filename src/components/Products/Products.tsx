import ProductImg from "../../assets/img/products/Nothing_Phone_1.jpg";
import "./Products.scss";
import { ReactComponent as Star } from "../../assets/icons/Star.svg";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "../../firebase";

export function Products() {
	const [data, loading, error] = useCollection(
		collection(getFirestore(app), "products"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const products = data?.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
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
								<div className="card__price">
									<div className="card__current-price">
										{Math.round((product.price / 100) * product.discount)} ₽
									</div>
									<div className="card__old-price">{product.price} ₽</div>
								</div>
								<div className="card__title">{product.title}</div>
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
					);
				})}
			</ul>
		</div>
	);
}
