import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "../../firebase";
import { Loader } from "../UI/Loader/Loader";
import { ProductsList } from "./ProductsList";

export function Products() {
	const [data, loading] = useCollection(
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
		<>
			{loading && <Loader />}
			<ProductsList products={products} />
		</>
	);
}
