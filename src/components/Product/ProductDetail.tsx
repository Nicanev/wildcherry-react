import "./Product.scss";
import {Rating} from "../Reviews/Rating";
import ImageGallery from "../Gallery/ImageGallery";
import axios from "axios";
import config from "../../config";
import parseJwt from "../../jwtUtils";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Feedback from "../Reviews/Feedback";
import {CartContext} from "../../Context/CartContext";

interface ProductProps {
    product: any;
    productImages: any;
}

export function ProductDetail({product, productImages}: ProductProps) {
    const date = new Date();
    const navigate = useNavigate();
    const [count, setCount] = useState<any>(1);
    const [specification, setSpecification] = useState<any>({});
    const [favourite, setFavourite] = useState<any>([]);
    const { fetchCart } = useContext(CartContext);


    useEffect(() => {
        fetchFavourite();
        fetchSpecification()
    }, []);

    const toggleFavourite = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        const user = parseJwt(localStorage.getItem("token"));
        try {
            if (
                favourite.products &&
                favourite.products.some((p: any) => p.id === product.id)
            ) {
                await axios.delete(
                    `${config.apiUrl}/favorite/${user.id}/${product.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setFavourite({
                    ...favourite,
                    products: favourite.products.filter((p: any) => p.id !== product.id),
                });
            } else {
                await addFavourite();
                fetchFavourite();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addFavourite = async () => {
        const token = localStorage.getItem("token");
        const user = parseJwt(localStorage.getItem("token"));
        try {
            const response = await axios.put(
                `${config.apiUrl}/favorite/${user.id}/${product.id}`,
                {
                    user_id: user.id,
                    product_id: product.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFavourite = async () => {
        const token = localStorage.getItem("token");
        const user = parseJwt(localStorage.getItem("token"));
        try {
            const response = await axios.get(`${config.apiUrl}/favorite/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFavourite(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSpecification = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${config.apiUrl}/specification/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSpecification(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToCart = async () => {
        if (count < 1) {
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        const user = parseJwt(localStorage.getItem("token"));
        try {
            const response = await axios.put(
                `${config.apiUrl}/cart/product`,
                {
                    user_id: user.id,
                    product_id: product.id,
                    count: Number(count),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            fetchCart();
            navigate("/cart");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="product">
            <div className="product__container">
                <div className="product__head">
                    <div className="product__title">{product?.name}</div>
                    <div className="product__rate">
                        <Rating score={product.score} count_score={product.count_score}/>
                    </div>
                </div>

                <div className="product__main">
                    <ImageGallery images={productImages}/>
                    <div className="product__price-block">
                        {product.price !== product.total_price ? (
                            <div className="product__oldprice">
                                {product.price.toLocaleString()} ₽
                            </div>
                        ) : null}
                        <div className="product__price">
                            {Math.round(product?.total_price).toLocaleString()} ₽
                        </div>
                        <div className="product__delivery">
                            Доставим в пункт выдачи{" "}
                            <span>{`${date.getDate() + 3}-${
                                date.getDate() + 5
                            } ${date.toLocaleString("ru", {month: "short"})}`}</span>
                        </div>
                        <div className="product__buttons">
                            <button onClick={() => addToCart()}>В корзину</button>
                            <div className="product__count">
                                <input
                                    type="number"
                                    className="product__count-input"
                                    min="1"
                                    max="10"
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => toggleFavourite()}
                                className={`favourite-btn ${
                                    favourite.products &&
                                    favourite.products.some((p: any) => p.id === product.id)
                                        ? "liked"
                                        : ""
                                }`}
                            >
                                {favourite.products &&
                                favourite.products.some((p: any) => p.id === product.id)
                                    ? "В избранном"
                                    : "Добавить в избранное"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product__description">
                    <div className="product__text">
                        <h2>Описание</h2>
                        <p>{product?.description}</p>
                    </div>
                    <div className="product__additional">
                        <h2>Характеристики</h2>
                        <div className="product__info">
                            {specification && (
                                <ul className="product__categories">
                                    <li>Ширина: {specification.width}</li>
                                    <li>Высота: {specification.height}</li>
                                    <li>Ширина: {specification.width}</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div className="product__reviews">
                    <Feedback productId={product.id}/>
                </div>
            </div>
        </div>
    );
}
