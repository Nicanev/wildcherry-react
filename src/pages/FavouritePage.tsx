import {useEffect, useState} from "react";
import parseJwt from "../jwtUtils";
import axios from "axios";
import config from "../config";
import {ProductsList} from "../components/Products/ProductsList";


const h1Styles: any = {
    fontSize: "3.2rem",
    fontWeight: "bold",
    margin: "4rem 0"
};

export function FavouritePage() {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        fetchFavourite()
    }, [])

    useEffect(() => {
        fetchFavourite();
    }, []);

    const fetchFavourite = async () => {
        const token = localStorage.getItem('token');
        const user = parseJwt(localStorage.getItem('token'));
        try {
            const response = await axios.get(`${config.apiUrl}/favorite/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const productList = response.data.products;
            const productsWithImages = await Promise.all(
                productList.map(async (product: any) => {
                    try {
                        const imageResponse = await axios.get(`${config.apiUrl}/product-img/product/${product.id}`);
                        const imageUrl = imageResponse.data[0].url;
                        return {
                            ...product,
                            images: [{url: imageUrl}],
                        };
                    } catch (error: any) {
                        console.log(error.message);
                        return product;
                    }
                })
            );
            setProducts(productsWithImages);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="favourite__container">
            <h1 style={h1Styles}>Избранное</h1>
            {products.length > 0 ? (
                <ProductsList products={products}/>
            ) : (
                <p>В вашем избранном ничего нет</p>
            )}
        </div>
    );
}