import {
	collection,
	endAt,
	getDocs,
	orderBy,
	query,
	startAt,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { Result } from "../components/Result/Result";
import { db } from "../firebase";

export function ResultPage() {
	let { search } = useParams();
	const ref = collection(db, "products");
	const q = query(
		ref,
		orderBy("lowerTitle"),
		startAt(search?.toLowerCase()),
		endAt(search?.toLowerCase() + "\uf8ff")
	);
	const [snapshot] = useCollection(q, {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const products = snapshot?.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	// const ResultHandler = async () => {
	// 	if (search) {
	// const q = query(
	// 	ref,
	// 	orderBy("lowerTitle"),
	// 	startAt(search.toLowerCase()),
	// 	endAt(search.toLowerCase() + "\uf8ff")
	// );
	// 		const querySnapshot = await getDocs(q);
	// const products = querySnapshot?.docs.map((doc) => ({
	// 	id: doc.id,
	// 	...doc.data(),
	// }));
	// 		console.log(products);
	// 	}
	// };
	// ResultHandler();

	return (
		<>
			<Result products={products} />
		</>
	);
}
