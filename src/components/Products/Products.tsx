import {Loader} from "../UI/Loader/Loader";
import {ProductsList} from "./ProductsList";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";

export function Products() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${config.apiUrl}/product`)
            .then((response) => {
                const productList = response.data;
                const productsWithImages = productList.map((product: any) => {
                    return {
                        ...product,
                        image: '',
                    };
                });

                setProducts(productsWithImages);
                console.log(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            });
    }, []);

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
                    setLoading(false);
                });
        });
    }, [products]);

    return (
        <>
            {loading && <Loader/>}
            <ProductsList products={products}/>
        </>
    );
}
