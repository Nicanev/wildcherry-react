import React, {useEffect, useState} from 'react';
import "../Table.scss"
import axios from "axios";
import config from "../../../../config";

interface Product {
    id: number;
    name: string;
    price: number;
}

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.apiUrl}/product`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }); // Замените '/api/users' на ваш конечный точку API для получения пользователей
            setProducts(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const deleteProduct = async (productId: number) => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`${config.apiUrl}/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !==productId));
        } catch (error) {
            console.error('Failed to delete user:', error);

        }
    };


    return (
        <div className="admin-products admin-table">
            <h2>Products</h2>
            <button className="admin-table__addBtn">Добавить продукт</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                            <button>Edit</button>
                            <button onClick={() => deleteProduct(product.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
