import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Loop } from "../../assets/icons/Loop.svg";

export function Search() {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const searchHandler = async () => {
		if (search) {
			navigate(`/search/${search}`);
		}
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
