import {useEffect, useState} from "react";
import parseJwt from "../jwtUtils";
import axios from "axios";
import config from "../config";
import {ProductsList} from "../components/Products/ProductsList";

export function FavouritePage() {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        fetchFavourite()
    }, [])

    const fetchFavourite = async () => {
        const token = localStorage.getItem('token');
        const user = parseJwt(localStorage.getItem('token'))
        try {
            const response = await axios.get(`${config.apiUrl}/favorite/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const productList = response.data.products;
            const productsWithImages = productList.map((product: any) => {
                return {
                    ...product,
                    image: '',
                };
            });
            setProducts(productsWithImages);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        products.forEach((product: any) => {
            axios
                .get(`${config.apiUrl}/product-img/product/${product.id}`)
                .then((response) => {
                    const imageUrl = response.data[0].url;
                    setProducts((prevProducts: any) =>
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
    }, [products]);


    return (<>
        <div className="favourite__container">
            <h1>Избранное</h1>
            <ProductsList products={products}/>
        </div>

    </>)
}