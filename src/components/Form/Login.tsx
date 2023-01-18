import { Form } from "./Form";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
	const dispatch = useDispatch();
	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password).then(console.log);
	};

	return (
		<>
			<Form title="Войти" handleClick={handleLogin} />
		</>
	);
}
