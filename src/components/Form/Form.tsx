import { useEffect, useState } from "react";
import "./Form.scss";
import CSS from "csstype";
import { Navigate } from "react-router-dom";

interface FormProps {
	title: string;
	handleClick: (email: string, password: string) => void;
}

interface InputFieldProps {
	name: string;
	type: string;
	value: string;
	label: string;
	placeholder: string;
	error: string;
	dirty: boolean;
	handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	blurHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
	name,
	type,
	value,
	label,
	placeholder,
	error,
	dirty,
	handler,
	blurHandler,
}: InputFieldProps) {
	const errorStyle: CSS.Properties = {
		border: error && dirty ? "0.1rem solid red" : "",
		WebkitTransition: "0.2s all",
		msTransition: "0.2s all",
	};

	return (
		<div className="form__field">
			<label htmlFor={name}>{label}:</label>
			<input
				name={name}
				type={type}
				style={errorStyle}
				value={value}
				onBlur={(e) => blurHandler(e)}
				onChange={(e) => handler(e)}
				placeholder={placeholder}
			/>
			{dirty && error && <div className="form__error">{error}</div>}
		</div>
	);
}

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
		if (re.test(String(e.target.value).toLowerCase())) {
			setEmailError("");
		} else {
			setEmailError("Почта введена неправильно!");
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
	const token = localStorage.getItem("token");

	return (
		<>
			{token ? (
				<Navigate replace to="/profile" />
			) : (
				<form className="form" onSubmit={handleSubmit}>
					<InputField
						name="email"
						type="email"
						value={email}
						error={emailError}
						dirty={emailDirty}
						handler={emailHandler}
						blurHandler={blurHandler}
						label="Почта"
						placeholder="Почта"
					/>

					<InputField
						name="password"
						type="password"
						value={password}
						error={passwordError}
						dirty={passwordDirty}
						handler={passwordHandler}
						blurHandler={blurHandler}
						label="Пароль"
						placeholder="Пароль"
					/>

					<button
						disabled={!formValid}
						onClick={() => handleClick(email, password)}
					>
						{title}
					</button>
				</form>
			)}
		</>
	);
}
