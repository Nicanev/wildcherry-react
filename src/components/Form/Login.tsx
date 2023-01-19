import { Form } from "./Form";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";

export function Login() {
	const dispatch = useAppDispatch();
	let navigate = useNavigate();
	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
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
		navigate("/profile");
	};

	return (
		<>
			<h1 className="form__title">Войти</h1>
			<p className="form__subtitle">Введите ваши данные ниже.</p>
			<Form title="Войти" handleClick={handleLogin} />
			<p className="form__link">
				Нет учетной записи?
				<Link to="/register">
					<span> Зарегистрируйтесь!</span>
				</Link>
			</p>
		</>
	);
}
