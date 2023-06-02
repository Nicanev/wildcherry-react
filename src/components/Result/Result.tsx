import { ProductsList } from "../Products/ProductsList";

interface ResultProps {
	products: any;
}

export function Result({ products }: ResultProps) {
	return (
		<div className="product__container">
			{products && <ProductsList products={products} />}
		</div>
	);
}
