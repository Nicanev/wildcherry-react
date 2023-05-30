import "./Product.scss";
// import {ReactComponent as Like} from "../../assets/icons/Like.svg";
import {Rating} from "../Reviews/Rating";
import {Reviews} from "../Reviews/Reviews";
import ImageGallery from "../Gallery/ImageGallery";
import axios from "axios";
import config from "../../config";
import parseJwt from "../../jwtUtils";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

interface ProductProps {
    product: any;
    productImages: any;
}

export function ProductDetail({product, productImages}: ProductProps) {
    let date = new Date();
    let navigate = useNavigate();
    const [count, setCount] = useState<any>(1);
    const [favourite, setFavourite] = useState<any>([]);

    useEffect(() => {
        fetchFavourite()
    }, [])

    const toggleFavourite = async () => {
    const token = localStorage.getItem('token');
    const user = parseJwt(localStorage.getItem('token'))
    try {
        if (favourite.products && favourite.products.some((p: any) => p.id === product.id)) {
            // Удалить продукт из избранного
            await axios.delete(`${config.apiUrl}/favorite/${user.id}/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFavourite({...favourite, products: favourite.products.filter((p: any) => p.id !== product.id)});
        } else {
            // Добавить продукт в избранное
            await addFavourite();
            fetchFavourite();
        }
    } catch (error) {
        console.error(error);
    }
}

const addFavourite = async () => {
    const token = localStorage.getItem('token');
    const user = parseJwt(localStorage.getItem('token'))
    try {
        const response = await axios.put(`${config.apiUrl}/favorite/${user.id}/${product.id}`, {
            user_id: user.id,
            product_id: product.id,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}

    const fetchFavourite = async () => {
        const token = localStorage.getItem('token');
        const user = parseJwt(localStorage.getItem('token'))
        try {
            const response = await axios.get(`${config.apiUrl}/favorite/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFavourite(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const addToCart = async () => {
        const token = localStorage.getItem('token');
        const user = parseJwt(localStorage.getItem('token'))
        try {
            const response = await axios.put(`${config.apiUrl}/cart/product`, {
                user_id: user.id,
                product_id: product.id,
                count: Number(count)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
            console.log(count)
            navigate('/cart')
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
                        <div className="product__oldprice">
                            {product?.price.toLocaleString()} ₽
                        </div>
                        <div className="product__price">
                            {product?.price.toLocaleString()} ₽
                            ₽
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
                            <button onClick={() => toggleFavourite()}
                                className={favourite.products && favourite.products.some((p: any) => p.id === product.id) ? "liked" : ""}>
                                {favourite.products && favourite.products.some((p: any) => p.id === product.id) ? "В избранном" : "Добавить в избранное"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product__description">
                    <div className="product__text">
                        <h1>Описание</h1>
                        <p>{product?.description}</p>
                    </div>
                    <div className="product__additional">
                        <h1>Характеристики</h1>
                        <div className="product__info">
                            {/*<ul className="product__categories">*/}
                            {/*	{category?.additional.map((el: any) => {*/}
                            {/*		return <li key={el}>{el}:</li>;*/}
                            {/*	})}*/}
                            {/*</ul>*/}
                            {/*<ul className="product__additional">*/}
                            {/*	{product?.additional.map((el: any) => {*/}
                            {/*		return <li key={el}>{el}</li>;*/}
                            {/*	})}*/}
                            {/*</ul>*/}
                        </div>
                    </div>
                </div>
                <div className="product__reviews">
                    <h2>Отзывы</h2>
                </div>
                <Reviews/>
            </div>
        </div>
    );
}
