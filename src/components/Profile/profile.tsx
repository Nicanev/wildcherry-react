import profileImg from "../../assets/img/profile/user.png";
import { getAuth, signOut } from "firebase/auth";
import "./Profile.scss";
import { useIdToken } from "react-firebase-hooks/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "../../firebase";

export function Profile() {
	const auth = getAuth();
	const [user] = useIdToken(auth);
	const exitHandler = () => {
		signOut(auth);
	};
	const [data] = useCollection(collection(getFirestore(app), "users"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const users = data?.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return (
		<div>
			<div className="profile">
				<div className="profile__container">
					<h1 className="profile__title">Профиль</h1>
					<div className="profile__content profile__block">
						<img src={profileImg} alt="" />
						<div className="profile__info">
							<div className="profile__email">{user?.email}</div>
							{users?.map((userEl: any) => {
								if (userEl.user_id === user?.uid)
									return (
										<div key={userEl.id} className="profile__name">
											<div>{userEl.first_name}</div>
											<div>{userEl.last_name}</div>
										</div>
									);
							})}
						</div>
					</div>
					<div className="profile__exit profile__block">
						<h1>Выйти из профиля</h1>
						<button onClick={exitHandler}>Выход</button>
					</div>
				</div>
			</div>
		</div>
	);
}
