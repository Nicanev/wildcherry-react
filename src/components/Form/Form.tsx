import { useEffect, useState } from "react";

interface FormProps {
	title: string;
	handleClick: (email: string, password: string) => void;
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
	return (
		<form onSubmit={handleSubmit}>
			{emailDirty && emailError && (
				<div className="form__error">{emailError}</div>
			)}
			<input
				name="email"
				type="email"
				value={email}
				onBlur={(e) => blurHandler(e)}
				onChange={(e) => emailHandler(e)}
				placeholder="Почта"
			/>
			{passwordDirty && passwordError && (
				<div className="form__error">{passwordError}</div>
			)}
			<input
				name="password"
				type="password"
				value={password}
				onBlur={(e) => blurHandler(e)}
				onChange={(e) => passwordHandler(e)}
				placeholder="Пароль"
			/>
			<button
				disabled={!formValid}
				onClick={() => handleClick(email, password)}
			>
				{title}
			</button>
		</form>
	);
}
