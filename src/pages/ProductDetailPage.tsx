import { doc, getFirestore } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { app } from "../firebase";

export function ProductDetailPage() {
	let { id } = useParams();
	const [value] = useDocument(doc(getFirestore(app), "products", String(id)), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const product: any = value?.data();

	return (
		<div className="product">
			<div className="product__container">
				<div className="product__title">{product?.title}</div>
				<div className="product__main">
					<div className="product__img"></div>
					<div className="product__text">{product?.description}</div>
				</div>
			</div>
		</div>
	);
}
