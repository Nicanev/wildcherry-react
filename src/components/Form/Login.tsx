import {Form} from "./Form";
import "./Form.scss";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../config";

export function Login() {
    let navigate = useNavigate();
    const handleLogin = (email: string, password: string) => {
        axios.post(`${config.apiUrl}/auth/login`, {
            email: email,
            password: password
        }).then((response) => {
            const token = response.data.accessToken
            const refreshToken = response.data.refreshToken
            console.log(response.data);
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            window.location.reload();
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Произошла ошибка при входе');
            }
        })

    };

    return (
        <>
            <h1 className="form__title">Войти</h1>
            <p className="form__subtitle">Введите ваши данные ниже.</p>
            <Form title="Войти" handleClick={handleLogin}/>
            <p className="form__link">
                Нет учетной записи?
                <Link to="/register">
                    <span> Зарегистрируйтесь!</span>
                </Link>
            </p>
        </>
    );
}
