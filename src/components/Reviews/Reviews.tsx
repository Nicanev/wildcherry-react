import { collection, getFirestore } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "../../firebase";

export const Reviews = () => {
	const [value] = useCollection(collection(getFirestore(app), "reviews"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const reviews: any = value?.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));

	return (
		<div>
			{reviews?.map((review: any) => {
				return <li key={review.id}>{review.text}</li>;
			})}
		</div>
	);
};
