import { Form } from "./Form";
import { Link, useNavigate } from "react-router-dom";
import "./Form.scss";
import axios from "axios";
import config from "../../config";

export function SignUp() {
	let navigate = useNavigate();
	const handleRegister = (email: string, password: string) => {
		axios.post(`${config.apiUrl}/auth/registration/user`, {
            email: email,
            password: password
        }).then((response) => {
            const token = response.data.accessToken
            const refreshToken = response.data.refreshToken
            console.log(response.data);
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            navigate("/profile");
        }).catch((error) => {
            console.log(error.error)
        })
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
