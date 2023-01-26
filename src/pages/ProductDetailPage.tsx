import { doc, getFirestore } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { ProductDetail } from "../components/Product/ProductDetail";
import { app } from "../firebase";

export function ProductDetailPage() {
	let { id } = useParams();
	const [productDoc] = useDocument(
		doc(getFirestore(app), "products", String(id)),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const product: any = productDoc?.data();
	const productID: any = productDoc?.id;

	const [categories] = useDocument(
		doc(getFirestore(app), "categories", String(product?.category)),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const category: any = categories?.data();

	return (
		<ProductDetail
			productID={productID}
			category={category}
			product={product}
		/>
	);
}
