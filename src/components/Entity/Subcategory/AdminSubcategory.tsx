import React, {useEffect, useState} from 'react';
import "../Table.scss"
import axios from "axios";
import config from "../../../config";
import {Link} from "react-router-dom";

interface SubCategory {
    id: number;
    name: string;
}

const AdminSubcategory: React.FC = () => {
    const [subCategory, setSubCategory] = useState<SubCategory[]>([]);

    useEffect(() => {
        fetchSubCategory();
    }, []);

    const fetchSubCategory = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.apiUrl}/subcategory`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setSubCategory(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const deleteCategory = async (categoryId: number) => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`${config.apiUrl}/subcategory/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setSubCategory((prevProducts) => prevProducts.filter((product) => product.id !==categoryId));
        } catch (error) {
            console.error('Failed to delete subcategory:', error);

        }
    };


    return (
        <div className="admin-products admin-table">
            <h2>Подкатегории</h2>
            <Link to="/admin/subcategory">
                <button className="admin-table__addBtn">Добавить подкатегорию</button>
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
                {subCategory.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>
                            <button>Изменить</button>
                            <button onClick={() => deleteCategory(product.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminSubcategory;
