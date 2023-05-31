import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import parseJwt from "../jwtUtils";
import config from "../config";

export function PaymentPage() {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cartData, setCartData] = useState<any>([]);
    const [cvv, setCvv] = useState('');

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        const user = parseJwt(localStorage.getItem('token'))
        try {
            const response = await axios.get(`${config.apiUrl}/cart/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const products = response.data.products;
            setCartData(products);


        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(event.target.value);
    };

    const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpirationDate(event.target.value);
    };

    const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCvv(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const user = parseJwt(token);

        try {
            for (const product of cartData) {
                const paymentData = {
                    user_id: user.id,
                    product_id: product.id,
                    count: product.CartProducts.count,
                };

                const response = await axios.put(`${config.apiUrl}/delivery/product`, paymentData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Payment response:', response.data);
            }
            await axios.delete(`${config.apiUrl}/cart/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Cart cleared successfully');

            // Reset form fields
            setCardNumber('');
            setExpirationDate('');
            setCvv('');
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return (
        <div>
            <h1>Страница оплаты</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cardNumber">Номер карты:</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="expirationDate">Expiration Date:</label>
                    <input
                        type="text"
                        id="expirationDate"
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={handleCvvChange}
                        required
                    />
                </div>
                <button type="submit">Оплатить</button>
            </form>
        </div>
    );
}
