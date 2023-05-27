import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from "../../../../config";
import "./AddEditForm.scss"
import {useParams} from "react-router-dom";

interface User {
    name: string;
    phone: string;
    surname: string;
}

interface EditUserProps {
    userId: number;
}

const EditUser: React.FC<EditUserProps> = ({userId}) => {
    const [user, setUser] = useState<User>({
        name: '',
        phone: '',
        surname: '',
    });


    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.get(`${config.apiUrl}/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUser(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [userId])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token')
        try {
            await axios.put(`${config.apiUrl}/profile/${userId}`, user, {
                headers: {
                        Authorization: `Bearer ${token}`,
                    }
            });
            console.log('User updated successfully!');
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <div className="create-user">
            <h2>Изменить пользователя</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Surname:</label>
                    <input
                        type="text"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Изменить</button>
            </form>
        </div>
    );
};

export default EditUser;
