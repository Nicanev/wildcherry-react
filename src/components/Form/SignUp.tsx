import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Form.scss";
import { useAppDispatch } from "../../hooks/redux-hooks";

export function SignUp() {
	const dispatch = useAppDispatch();
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
			<h1 className="form__title">Регистрация</h1>
			<p className="form__subtitle">Введите ваши данные ниже.</p>
			<Form title="Зарегистрироваться" handleClick={handleRegister} />
			<p className="form__link">
				Уже есть учетная запись?
				<Link to="/login">
					<span> Войдите!</span>
				</Link>
			</p>
		</>
	);
}
