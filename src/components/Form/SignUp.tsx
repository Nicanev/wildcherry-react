import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Form.scss";

export function SignUp() {
	let navigate = useNavigate();
	const handleRegister = (email: string, password: string) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password);
		navigate("/profile");
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
