import { Navigate } from "react-router-dom";
import { Profile } from "../components/Profile/profile";

export function ProfilePage() {
	const token = localStorage.getItem('token');
	return token ? <Profile /> : <Navigate replace to="/login" />;
}
