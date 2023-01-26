import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "../../firebase";
import { ProductsList } from "./ProductsList";

export function Products() {
	const [data] = useCollection(collection(getFirestore(app), "products"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const products = data?.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return <ProductsList products={products} />;
}
