import "./Products.scss";
import {Link} from "react-router-dom";
import {Rating} from "../Reviews/Rating";
import parseJwt from "../../jwtUtils";
import axios from "axios";
import config from "../../config";
import {useState} from "react";

interface ProductsProps {
    products: any;
}

export function ProductsList({products}: ProductsProps) {
    const [addedToCart, setAddedToCart] = useState<string[]>([]);

    const addToCart = async (product: any) => {
        const token = localStorage.getItem("token");
        if (!token) {
            const savedCartData = JSON.parse(localStorage.getItem("guestCart") || "[]");
            const existingProductIndex = savedCartData.findIndex((item: any) => item.id === product.id);
            if (existingProductIndex !== -1) {
                // If the product already exists in the local cart, increase its count
                 savedCartData[existingProductIndex].CartProducts.count++;
            } else {
                // If the product doesn't exist in the local cart, add it
                savedCartData.push({
                    product: {
                        ...product,
                        CartProducts: {
                            count: 1
                        }
                    }
                });
            }
            localStorage.setItem("guestCart", JSON.stringify(savedCartData));
            setAddedToCart((prevAddedToCart) => [...prevAddedToCart, product.id]);
        } else {
            const user = parseJwt(localStorage.getItem("token"));
            try {
                const response = await axios.put(
                    `${config.apiUrl}/cart/product`,
                    {
                        user_id: user.id,
                        product_id: product.id,
                        count: 1,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setAddedToCart((prevAddedToCart) => [...prevAddedToCart, product.id]);
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <div className="products">
            <ul className="products__list">
                {products?.map((product: any) => {
                    const isAddedToCart = addedToCart.includes(product.id);
                    return (
                        <li key={product.id} className="product__card card">
                            <div className="card__img">
                                <img src={product.images[0].url} alt="Product"/>
                                {product.discounts && product.discounts.length > 0 ? (
                                    <div className="card__discount">
                                        -{product.discounts[0].value}%
                                    </div>
                                ) : null}
                            </div>
                            <div className="card__body">
                                <div className="card__price">
                                    <div className="card__current-price">
                                        {Math.round(product.total_price).toLocaleString()} ₽
                                    </div>
                                    {product.price === product.total_price ? null : (
                                        <div className="card__old-price">
                                            {product.price.toLocaleString()} ₽
                                        </div>
                                    )}
                                </div>
                                <Link to={`/product/${product.id}`}>
                                    <div className="card__title">{product.name}</div>
                                </Link>
                                {product.score && (
                                    <div className="card__rating">
                                        <Rating
                                            score={product.score}
                                            count_score={product.count_score}
                                        />
                                    </div>
                                )}
                                <button
                                    className="card__btn"
                                    onClick={() => addToCart(product)}
                                    disabled={isAddedToCart}
                                >
                                    {isAddedToCart ? "В корзине" : "В корзину"}
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
