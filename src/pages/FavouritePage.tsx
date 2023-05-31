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
                    images: [{url: ''}],
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
                                    images: [{url: imageUrl}],
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


    return (
  <div className="favourite__container">
    <h1 style={h1Styles}>Избранное</h1>
    {products.length > 0 ? (
      <ProductsList products={products} />
    ) : (
      <p>В вашем избранном ничего нет</p>
    )}
  </div>
);
}