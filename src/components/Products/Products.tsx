import { Loader } from "../UI/Loader/Loader";
import { ProductsList } from "./ProductsList";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

export function Products() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<any>([]);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${config.apiUrl}/product`)
			.then((response) => {
				const productList = response.data;
				const productsWithImages = productList.map((product: any) => {
					return {
						...product,
						image: "",
					};
				});

				setProducts(productsWithImages);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error.message);
				setLoading(false);
			});
	}, []);



	return (
		<>
			{loading && <Loader />}
			<ProductsList products={products} />
		</>
	);
}
