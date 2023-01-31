import { useEffect, useState } from "react";
import "./Form.scss";
import CSS from "csstype";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Loader } from "../UI/Loader/Loader";
interface FormProps {
	title: string;
	handleClick: (email: string, password: string) => void;
}

const inputErrorStyle: CSS.Properties = {
	border: "0.1rem solid red",
	WebkitTransition: "0.2s all",
	msTransition: "0.2s all",
};

export function Form({ title, handleClick }: FormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailDirty, setEmailDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);
	const [emailError, setEmailError] = useState(
		"Поле email не может быть пустым"
	);
	const [passwordError, setPasswordError] = useState(
		"Поле пароль не может быть пустым"
	);
	const [formValid, setFormValid] = useState(false);

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [emailError, passwordError]);

	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		const re =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError("Почта введена неправильно!");
		} else {
			setEmailError("");
		}
	};

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (e.target.value.length < 3 || e.target.value.length > 16) {
			setPasswordError(
				"Пароль должен быть длинной не меньше 3 и не больше 16 символов"
			);
			if (!e.target.value) {
				setPasswordError("Поле пароль не может быть пустым");
			}
		} else {
			setPasswordError("");
		}
	};

	const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case "email":
				setEmailDirty(true);
				break;
			case "password":
				setPasswordDirty(true);
				break;
		}
	};
	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	const auth = getAuth();
	const [user, loading] = useAuthState(auth);
	return (
		<>
			{loading && <Loader />}
			{!user ? (
				<form className="form" onSubmit={handleSubmit}>
					<div className="form__field">
						<label htmlFor="email">Почта:</label>
						<input
							name="email"
							type="email"
							style={emailError && emailDirty ? inputErrorStyle : {}}
							value={email}
							onBlur={(e) => blurHandler(e)}
							onChange={(e) => emailHandler(e)}
							placeholder="Почта"
						/>
						{emailDirty && emailError && (
							<div className="form__error">{emailError}</div>
						)}
					</div>

					<div className="form__field">
						<label htmlFor="password">Пароль:</label>
						<input
							name="password"
							type="password"
							style={passwordError && passwordDirty ? inputErrorStyle : {}}
							value={password}
							onBlur={(e) => blurHandler(e)}
							onChange={(e) => passwordHandler(e)}
							placeholder="Пароль"
						/>
						{passwordDirty && passwordError && (
							<div className="form__error">{passwordError}</div>
						)}
					</div>

					<button
						disabled={!formValid}
						onClick={() => handleClick(email, password)}
					>
						{title}
					</button>
				</form>
			) : (
				<Navigate replace to="/profile" />
			)}
		</>
	);
}
