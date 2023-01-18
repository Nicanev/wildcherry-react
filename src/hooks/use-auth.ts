import { useSelector } from "react-redux";

export function useAuth() {
	const { email, token, id, password } = useSelector(
		(state: any) => state.user
	);
	return {
		isAuth: !!email,
		email,
		token,
		id,
	};
}
