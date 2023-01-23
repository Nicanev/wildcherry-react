import profileImg from "../../assets/img/profile/user.png";
import { getAuth, signOut } from "firebase/auth";
import "./Profile.scss";
import { useIdToken } from "react-firebase-hooks/auth";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

export function Profile() {
	const auth = getAuth();
	const [user] = useIdToken(auth);
	const exitHandler = () => {
		signOut(auth);
	};
	const userRef = collection(db, "users");
	const [data] = useCollection(
		query(userRef, where("user_id", "==", user?.uid))
	);
	let userInfo: any;
	data?.forEach((doc) => {
		userInfo = doc.data();
	});

	return (
		<div className="profile">
			<div className="profile__container">
				<h1 className="profile__title">Профиль</h1>
				<div className="profile__content profile__block">
					<img src={profileImg} alt="" />
					<div className="profile__info">
						<div className="profile__email">{user?.email}</div>
						{userInfo && (
							<div className="profile__name">
								<div>{userInfo.first_name}</div>
								<div>{userInfo.last_name}</div>
							</div>
						)}
					</div>
				</div>
				<div className="profile__exit profile__block">
					<h1>Выйти из профиля</h1>
					<button onClick={exitHandler}>Выход</button>
				</div>
			</div>
		</div>
	);
}
