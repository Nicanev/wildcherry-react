import React, {useState} from 'react';
import axios from 'axios';
import config from "../../../../config";
import "./AddEditForm.scss"

interface User {
    name: string;
    email: string;
    phone: string;
    surname: string;
    password: string;
}

const CreateUser: React.FC = () => {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        phone: '',
        surname: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post(`${config.apiUrl}/auth/registration/user`, user);
            setUser({name: '', email: '', phone: '', surname: '', password: ''});
            console.log('User created successfully!');
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <div className="create-user">
            <h2>Создать пользователя</h2>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
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
                <div className="form-item">
                    <label>Пароль:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateUser;
