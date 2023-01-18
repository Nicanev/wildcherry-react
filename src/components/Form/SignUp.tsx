import { Form } from "./Form";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export function SignUp() {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const handleRegister = (email: string, password: string) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
			user
				.getIdToken()
				.then(function (idToken) {
					dispatch(
						setUser({
							email: user.email,
							token: idToken,
							id: user.uid,
						})
					);
				})
				.catch(function (error) {});
		});
		navigate("/login");
	};
	return (
		<>
			<Form title="Зарегистрироваться" handleClick={handleRegister} />
		</>
	);
}
