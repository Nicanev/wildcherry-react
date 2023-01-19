import { useAppDispatch } from "../hooks/redux-hooks";
import { useAuth } from "../hooks/use-auth";
import { removeUser } from "../store/slices/userSlice";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export function ProfilePage() {
	const auth = getAuth();
	const dispatch = useAppDispatch();
	const { isAuth, email } = useAuth();
	const exitHandler = () => {
		dispatch(removeUser());
		signOut(auth);
	};
	return isAuth ? (
		<div>
			PROFILE
			<div>Your name: {email}</div>
			<button onClick={exitHandler}>Выход</button>
		</div>
	) : (
		<Navigate replace to="/login" />
	);
}
