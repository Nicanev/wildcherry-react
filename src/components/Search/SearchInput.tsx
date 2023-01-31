import {
	collection,
	endAt,
	getDocs,
	orderBy,
	query,
	startAt,
} from "firebase/firestore";
import { useState } from "react";
import { ReactComponent as Loop } from "../../assets/icons/Loop.svg";
import { db } from "../../firebase";

export function Search() {
	const [search, setSearch] = useState("");
	const ref = collection(db, "products");

	const searchHandler = async () => {
		const q = query(
			ref,
			orderBy("lowerTitle"),
			startAt(search.toLowerCase()),
			endAt(search.toLowerCase() + "\uf8ff")
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
		});
	};
	return (
		<>
			<input
				type="text"
				value={search}
				onChange={(event) => setSearch(event.target.value)}
				placeholder="Искать на Wildcherry.."
			/>
			<button onClick={searchHandler}>
				<Loop />
			</button>
		</>
	);
}
