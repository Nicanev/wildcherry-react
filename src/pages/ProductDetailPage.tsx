import { doc, getFirestore } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { ProductDetail } from "../components/Product/ProductDetail";
import { Loader } from "../components/UI/Loader/Loader";
import { app } from "../firebase";

export function ProductDetailPage() {
	let { id } = useParams();
	const [productDoc, loading] = useDocument(
		doc(getFirestore(app), "products", String(id)),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const product: any = productDoc?.data();

	const [categories] = useDocument(
		doc(getFirestore(app), "categories", String(product?.category)),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const category: any = categories?.data();

	return (
		<>
			{loading && <Loader />}
			{productDoc && (
				<ProductDetail productID={id} category={category} product={product} />
			)}
		</>
	);
}
