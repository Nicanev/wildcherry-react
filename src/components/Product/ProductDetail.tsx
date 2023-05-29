import "./Product.scss";
import {ReactComponent as Like} from "../../assets/icons/Like.svg";
import {Rating} from "../Reviews/Rating";
import {Reviews} from "../Reviews/Reviews";
import ImageGallery from "../Gallery/ImageGallery";
import axios from "axios";
import config from "../../config";
import parseJwt from "../../jwtUtils";

interface ProductProps {
    product: any;
    productImages: any;
}

export function ProductDetail({product, productImages}: ProductProps) {
    let date = new Date();

    const addToCart = async () => {
        const token = localStorage.getItem('token');
        const user = parseJwt(localStorage.getItem('token'))
        try {
            const response = await axios.put(`${config.apiUrl}/cart/product`, {
                user_id: user.id,
                product_id: product.id,
                count: 1
            }, {
                headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            console.log(response.data)

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
                            <button>Купить сейчас</button>
                            <button>
                                <Like/>
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
