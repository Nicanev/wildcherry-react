import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import parseJwt from "../../../jwtUtils";
import config from "../../../config";
import axios from "axios";

interface Discount {
    id: number;
    value: string;
    title: string;
    description: string;
    products: any;
    owner: any;
}

const SellerDiscount: React.FC = () => {
    const [discount, setDiscount] = useState<Discount[]>([]);

    useEffect(() => {
        fetchDiscount();
    }, []);

    const fetchDiscount = async () => {
        const token = localStorage.getItem('token')
        const user = parseJwt(token)
        try {
            const response = await axios.get(`${config.apiUrl}/discount`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const filteredDiscount = response.data.filter((discount: any) => discount.owner.id === user.id);
            setDiscount(filteredDiscount);
        } catch (error) {
            console.error('Failed to fetch discount:', error);
        }
    };

    const deleteDiscount = async (discountId: number) => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`${config.apiUrl}/discount/${discountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setDiscount((prevDiscount) => prevDiscount.filter((discount) => discount.id !== discountId));
        } catch (error) {
            console.error('Failed to delete discount:', error);

        }
    };
     return (
        <div className="admin-products admin-table">
            <h2>Ваши акции</h2>
            <Link to="/seller/product">
                <button className="admin-table__addBtn">Добавить акцию</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Размер скидки</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {discount.map((discount) => (
                    <tr key={discount.id}>
                        <td>{discount.id}</td>
                        <td>{discount.title}</td>
                        <td>{discount.value}</td>
                        <td>
                            <Link to={'/seller/discount/' + discount.id}>
                                <button>Изменить</button>
                            </Link>
                            <button onClick={() => deleteDiscount(discount.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SellerDiscount;
