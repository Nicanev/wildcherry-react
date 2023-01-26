import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { ReactComponent as Star } from "../../assets/icons/Star.svg";

interface RatingProps {
	productID: any;
}

export function Rating({ productID }: RatingProps) {
	const id = productID;
	const [snapshot] = useCollection(
		query(collection(db, "reviews"), where("product_id", "==", String(id)))
	);
	const reviews: any = snapshot?.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	let rate: number = 0;
	let revCount: number = reviews?.length;
	reviews?.map((rev: any) => {
		return (rate += Math.round(rev?.rate / 5));
	});

	return (
		<>
			<Star className={rate >= 1 ? "star-full" : ""} />
			<Star className={rate >= 2 ? "star-full" : ""} />
			<Star className={rate >= 3 ? "star-full" : ""} />
			<Star className={rate >= 4 ? "star-full" : ""} />
			<Star className={rate >= 5 ? "star-full" : ""} />
			<span>{revCount} отзывов</span>
		</>
	);
}
