import profileImg from "../../assets/img/profile/user.png";
import "./Profile.scss";
import config from "../../config";
import parseJwt from "../../jwtUtils";
import { useEffect, useState } from "react";
import axios from "axios";
import refreshToken from "../../tokenUtils";

export function Profile() {
	const exitHandler = () => {
		const token = localStorage.getItem("token");
		const decodedToken = parseJwt(token);
		axios
			.get(`${config.apiUrl}/auth/logout/${decodedToken.id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				localStorage.clear();
				window.location.reload();
			})
			.catch((error) => {
				console.log(error.message);
				localStorage.clear();
				window.location.reload();
			});
	};
	const [user, setUser] = useState<any>(null);
	const [userInfo, setUserInfo] = useState<any>(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = parseJwt(token);
			setUser(decodedToken);

			axios
				.get(`${config.apiUrl}/profile/${decodedToken.id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setUserInfo(response.data);
				})
				.catch((error) => {
					refreshToken();
					console.log(error.message);
				});
		}
	}, []);

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name || "");
			setSurname(userInfo.surname || "");
			setPhone(userInfo.phone || "");
		}
	}, [userInfo]);

	const updateProfileHandler = () => {
		const token = localStorage.getItem("token");
		const updatedData = {
			name: name,
			surname: surname,
			phone: phone,
		};

		axios
			.put(`${config.apiUrl}/profile/${user.id}`, updatedData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log("Профиль успешно обновлен!");
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div className="profile">
			<div className="profile__container">
				<h1 className="profile__title">Профиль</h1>
				<div className="profile__content profile__block">
					<img src={profileImg} alt="" />
					<div className="profile__info">
						{user && <div className="profile__email">{user.email}</div>}
					</div>
				</div>
				<div className="profile__data profile__block">
					<h2>Ваши данные:</h2>
					<div className="profile__inputs">
						<input
							type="text"
							placeholder="Ваше имя"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Ваша фамилия"
							value={surname}
							onChange={(e) => setSurname(e.target.value)}
						/>
						<input
							type="tel"
							placeholder="Ваш телефон"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
						<button onClick={updateProfileHandler}>Обновить</button>
					</div>
				</div>
				<div className="profile__exit profile__block">
					<h2>Выйти из профиля</h2>
					<button onClick={exitHandler}>Выход</button>
				</div>
			</div>
		</div>
	);
}
