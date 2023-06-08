import React, {useEffect, useState} from "react";
import "../Table.scss";
import axios from "axios";
import config from "../../../config";
import {Link} from "react-router-dom";

interface Category {
    id: number;
    name: string;
}

const AdminCategory: React.FC = () => {
    const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${config.apiUrl}/category`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategory(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const deleteCategory = async (categoryId: number) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${config.apiUrl}/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategory((prevProducts) =>
                prevProducts.filter((product) => product.id !== categoryId)
            );
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div className="admin-products admin-table">
            <h2>Категории</h2>
            <Link to="/admin/category">
                <button className="admin-table__addBtn">Добавить категорию</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {category.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>
                            <button>Изменить</button>
                            <button onClick={() => deleteCategory(product.id)}>
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCategory;
