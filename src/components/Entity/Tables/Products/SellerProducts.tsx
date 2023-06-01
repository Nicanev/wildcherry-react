import React, {useEffect, useState} from 'react';
import "../Table.scss"
import axios from "axios";
import config from "../../../../config";
import {Link} from "react-router-dom";
import parseJwt from "../../../../jwtUtils";

interface Product {
    id: number;
    name: string;
    price: number;
}

const SellerProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const token = localStorage.getItem('token')
        const user = parseJwt(token)
        try {
            const response = await axios.get(`${config.apiUrl}/product`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const filteredProducts = response.data.filter((product: any) => product.owner.id === user.id);

            setProducts(filteredProducts);
        } catch (error) {
            console.error('Failed to fetch products:', error);
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
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        } catch (error) {
            console.error('Failed to delete product:', error);

        }
    };


    return (
        <div className="admin-products admin-table">
            <h2>Ваши позиции</h2>
            <Link to="/seller/product">
                <button className="admin-table__addBtn">Добавить продукт</button>
            </Link>
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
                            <Link to={'/seller/product/' + product.id}>
                                <button>Изменить</button>
                            </Link>
                            <button onClick={() => deleteProduct(product.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellerProducts;
