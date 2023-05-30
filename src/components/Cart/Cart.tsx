import "./Cart.scss"
import parseJwt from "../../jwtUtils";
import axios from "axios";
import config from "../../config";
import {useEffect, useState} from "react";


export function Cart() {
    const [cartData, setCartData] = useState<any>([]);

    const deleteFromCart = async (productId: any, count: any) => {
        const token = localStorage.getItem('token');
        const user = parseJwt(localStorage.getItem('token'))
        try {
            const response = await axios.delete(`${config.apiUrl}/cart/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    user_id: user.id,
                    product_id: productId,
                    count: count
                }
            });
            fetchCart()
            console.log(response.data)

        } catch (error) {
            console.error(error);
        }
    }
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

    useEffect(() => {
        cartData.forEach((product: any) => {
            axios
                .get(`${config.apiUrl}/product-img/product/${product.id}`)
                .then((response) => {
                    const imageUrl = response.data[0].url;
                    setCartData((prevProducts: any) =>
                        prevProducts.map((prevProduct: any) => {
                            if (prevProduct.id === product.id) {
                                return {
                                    ...prevProduct,
                                    image: imageUrl,
                                };
                            }
                            return prevProduct;
                        })
                    );
                })
                .catch((error) => {
                    console.log(error.message);

                });
        });
    }, [cartData]);
    return <>
        <div className="cart">
            <div className="cart__container">
                <h1>Корзина</h1>
                <div className="cart__table">
                    <ul className="cart__list">
                        {cartData.length > 0 ? (
                            cartData.map((item: any) => (
                                <li key={item.id}>
                                    <img src={item.image} alt="Product" className="cart__img"/>
                                    <div className="cart__name">
                                        <span>Название:</span>
                                        {item.name}
                                    </div>
                                    <div className="cart__count">
                                        <span>Кол-во:</span>
                                        {item.CartProducts.count}
                                    </div>
                                    <div className="cart__price">
                                        <span>Цена:</span> {item.price}
                                    </div>
                                    <div className="cart__delete"
                                         onClick={() => deleteFromCart(item.id, item.CartProducts.count)}>

                                    </div>

                                </li>
                            ))
                        ) : (
                            <li>Корзина пуста</li>
                        )}

                        <li>
                            <button className="cart__buy">Оплатить</button>
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