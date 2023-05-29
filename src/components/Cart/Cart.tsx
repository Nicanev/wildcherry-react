import "./Cart.scss"
import parseJwt from "../../jwtUtils";
import axios from "axios";
import config from "../../config";
import {useEffect, useState} from "react";


export function Cart() {
    const [cartData, setCartData] = useState<any>([]);
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
            console.log(response.data)

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);
    return <>
        <div className="cart">
            <div className="cart__container">
                <h1>Корзина</h1>
                <div className="cart__table">
                    <ul className="cart__list">
                        {cartData.length > 0 ? (
                            cartData.map((item: any) => (
                                <li key={item.id}>
                                    <img src="" alt="Product" className="cart__img"/>
                                    <div className="cart__name">
                                        <span>Название:</span>
                                        {item.name}
                                    </div>
                                    <div className="cart__count">
                                        <span>Кол-во:</span>
                                        1
                                    </div>
                                    <div className="cart__price">
                                        <span>Цена:</span> 500
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>Корзина пуста</li>
                        )}

                        <li>
                            <button>Оплатить</button>
                            <span>Сумма: 500</span>
                        </li>
                    </ul>
                    <div className="cart__end">

                    </div>
                </div>
            </div>
        </div>

    </>
}