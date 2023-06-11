import "./Cart.scss";
import {useEffect, useState} from "react";
import {Loader} from "../UI/Loader/Loader";
import {useNavigate} from "react-router-dom";

export function GuestCart() {
    const [cartData, setCartData] = useState<any>([]);
    const [cost, setCost] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

       const incrementHandler = (productId: any) => {
        const updatedCartData = cartData.map((item: any) => {
            if (item.product.id === productId && item.product.CartProducts) {
                const newCount = (item.product.CartProducts.count || 0) + 1;
                return {
                    ...item,
                    product: {
                        ...item.product,
                        CartProducts: {
                            ...item.product.CartProducts,
                            count: newCount,
                        },
                    },
                };
            }
            return item;
        });
        setCartData(updatedCartData);
        calculateCost(updatedCartData);
        localStorage.setItem("guestCart", JSON.stringify(updatedCartData));
    };

    const decrementHandler = (productId: any, count: any) => {
        if (count === 1) {
            return;
        }
        const updatedCartData = cartData.map((item: any) => {
            if (item.product.id === productId && item.product.CartProducts) {
                const newCount = (item.product.CartProducts.count || 0) - 1;
                return {
                    ...item,
                    product: {
                        ...item.product,
                        CartProducts: {
                            ...item.product.CartProducts,
                            count: newCount,
                        },
                    },
                };
            }
            return item;
        });
        setCartData(updatedCartData);
        calculateCost(updatedCartData);
        localStorage.setItem("guestCart", JSON.stringify(updatedCartData));
    };

    const deleteFromCart = (productId: any, count: any) => {
        const updatedCartData = cartData.filter(
            (item: any) => item.product.id !== productId
        );
        setCartData(updatedCartData);
        calculateCost(updatedCartData);
        localStorage.setItem("guestCart", JSON.stringify(updatedCartData));
    };

    const calculateCost = (cartItems: any[]) => {
        const totalCost = cartItems.reduce((acc, item) => {
            if (item.product.CartProducts && item.product.CartProducts.count) {
                return acc + item.product.total_price * item.product.CartProducts.count;
            } else {
                return acc + item.product.total_price;
            }
        }, 0);
        setCost(totalCost);
    };

    useEffect(() => {
        const savedCartData = JSON.parse(localStorage.getItem("guestCart") || "[]");
        setCartData(savedCartData);
        calculateCost(savedCartData);
    }, []);

    const handlePayment = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/payment");
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <div className="cart">
                <div className="cart__container">
                    <h1>Корзина</h1>
                    {loading ? (
                        <Loader/>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        <div className="cart__table">
                            <ul className="cart__list">
                                {cartData.length > 0 ? (
                                    cartData.map((item: any) => (
                                        <li key={item.product.id}>
                                            <img
                                                src={item.product.images[0]?.url}
                                                alt="Product"
                                                className="cart__img"
                                            />
                                            <div className="cart__name">
                                                <span>Название:</span>
                                                {item.product.name}
                                            </div>
                                            <div className="cart__count">
                                                <span>Кол-во:</span>
                                                <div className="cart__count-input">
                                                    <button
                                                        onClick={() =>
                                                            decrementHandler(
                                                                item.product.id,
                                                                item.product.CartProducts.count
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.product.CartProducts.count}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => incrementHandler(item.product.id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="cart__price">
                                                <span>Цена:</span>{" "}
                                                {(Number(item.product.total_price) * Number(item.product.CartProducts.count)).toLocaleString()}
                                            </div>
                                            <div
                                                className="cart__delete"
                                                onClick={() =>
                                                    deleteFromCart(item.product.id, item.product.CartProducts.count)
                                                }
                                            ></div>
                                        </li>
                                    ))
                                ) : (
                                    <li>Корзина пуста</li>
                                )}

                                {cartData.length > 0 && (
                                    <li>
                                        <button className="cart__buy" onClick={handlePayment}>
                                            Оплатить
                                        </button>
                                        <span>Сумма: {cost.toLocaleString()}</span>
                                    </li>
                                )}
                            </ul>
                            <div className="cart__end"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
