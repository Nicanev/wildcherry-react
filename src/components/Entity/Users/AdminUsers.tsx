import React, {useEffect, useState} from 'react'
import "../Table.scss"
import axios from "axios";
import config from "../../../config";
import {Link} from "react-router-dom";
import refreshToken from "../../../tokenUtils";

interface User {
    id: number;
    name: string;
    email: string;
    profile: any;
    roles: any;
}

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.apiUrl}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }); // Замените '/api/users' на ваш конечный точку API для получения пользователей
            setUsers(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch users:', error);
            refreshToken();
        }
    };

    const deleteUser = async (userId: number) => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`${config.apiUrl}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);

        }
    };


    return (
        <div className="admin-users admin-table">
            <h2>Users</h2>
            <Link to="/admin/user">
                <button className="admin-table__addBtn">Добавить пользователя</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.profile.name}</td>
                        <td>{user.email}</td>
                        <td>{user.roles[user.roles.length - 1].value}</td>
                        <td>
                            <Link to={"/admin/user/" + user.id}>
                                <button>Изменить</button>
                            </Link>
                            <button onClick={() => deleteUser(user.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
