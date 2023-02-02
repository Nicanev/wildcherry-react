import { ProductsList } from "../Products/ProductsList";

interface ResultProps {
	products: any;
}

export function Result({ products }: ResultProps) {
	return <>{products && <ProductsList products={products} />}</>;
}
