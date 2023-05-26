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
                // Получаем список продуктов
                const productList = response.data;

                // Создаем новый список продуктов с добавленными изображениями
                const productsWithImages = productList.map((product: any) => {
                    return {
                        ...product,
                        image: '', // Создаем пустое поле для изображения
                    };
                });

                // Устанавливаем обновленный список продуктов
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
        // Загружаем изображения для каждого продукта
        products.forEach((product: any) => {
            axios
                .get(`${config.apiUrl}/product-img/product/${product.id}`)
                .then((response) => {
                    // Получаем URL изображения
                    const imageUrl = response.data[0].url;

                    // Обновляем поле изображения для продукта
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
