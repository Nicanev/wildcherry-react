import { Navigate } from "react-router-dom";
import { Profile } from "../components/Profile/profile";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export function ProfilePage() {
	const auth = getAuth();
	const [user] = useAuthState(auth);
	return user ? <Profile /> : <Navigate replace to="/login" />;
}
