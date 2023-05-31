import React, {useEffect, useState} from 'react';
import axios from 'axios';
import parseJwt from "../../jwtUtils";
import config from "../../config";
import "./Delivery.scss"
import {Link} from "react-router-dom";
import {Loader} from "../UI/Loader/Loader";

export function Delivery() {
    const [deliveryData, setDeliveryData] = useState<any>(null);

    useEffect(() => {
        const fetchDeliveryData = async () => {
            const token = localStorage.getItem('token');
            const user = parseJwt(localStorage.getItem('token'))
            try {
                const response = await axios.get(`${config.apiUrl}/delivery/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDeliveryData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDeliveryData();
    }, []);

    const calculateDeliveryDate = () => {
        if (deliveryData && deliveryData.createdAt) {
            const createdAt = new Date(deliveryData.createdAt);
            const deliveryDate = new Date(createdAt.getTime() + 2 * 24 * 60 * 60 * 1000);
            return deliveryDate.toLocaleDateString();
        }
        return '';
    };

    return (
        <div className="delivery__container">
            <h1>Доставки</h1>
            {deliveryData ? (
                <div>
                    <h2>Заказанные продукты:</h2>
                    <div className="delivery__card-container">
                        {deliveryData.products.map((product: any) => (
                            <Link key={product.id} to={`/product/${product.id}`}>
                                <div key={product.id} className="delivery__card">
                                    <h3 className="delivery__card-title">{product.name}</h3>
                                    <p className="delivery__card-price">Цена: {product.price.toLocaleString()}</p>
                                    <p className="delivery__card-count">Количество: {product.DeliveryProducts.count}</p>
                                    <p className="delivery__card-delivery-date">
                                        Примерная дата доставки: {calculateDeliveryDate()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <Loader/>
            )}
        </div>
    );

}