import "./Cart.scss";
import parseJwt from "../../jwtUtils";
import axios from "axios";
import config from "../../config";
import {useContext, useEffect, useState} from "react";
import {Loader} from "../UI/Loader/Loader";
import {Link} from "react-router-dom";
import {GuestCart} from "./GuestCart";
import {CartContext} from "../../Context/CartContext";

export function Cart() {
  const [cartData, setCartData] = useState<any>([]);
  const [cost, setCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const {  fetchCart } = useContext(CartContext);


  const incrementHandler = async (productId: any) => {
    const token = localStorage.getItem("token");
    const user = parseJwt(localStorage.getItem("token"));
    try {
      const response = await axios.put(
        `${config.apiUrl}/cart/product`,
        {
          user_id: user.id,
          product_id: productId,
          count: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCartData = cartData.map((item: any) => {
        if (item.id === productId) {
          return {
            ...item,
            CartProducts: {
              ...item.CartProducts,
              count: item.CartProducts.count + 1,
            },
          };
        }
        return item;
      });
      setCartData(updatedCartData);
      calculateCost(updatedCartData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const decrementHandler = async (productId: any, count: any) => {
    if (count === 1) {
      return;
    }
    const token = localStorage.getItem("token");
    const user = parseJwt(localStorage.getItem("token"));
    try {
      const response = await axios.put(
        `${config.apiUrl}/cart/product`,
        {
          user_id: user.id,
          product_id: productId,
          count: -1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCartData = cartData.map((item: any) => {
        if (item.id === productId) {
          return {
            ...item,
            CartProducts: {
              ...item.CartProducts,
              count: item.CartProducts.count - 1,
            },
          };
        }
        return item;
      });
      setCartData(updatedCartData);
      calculateCost(updatedCartData);
      console.log(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromCart = async (productId: any, count: any) => {
    const token = localStorage.getItem("token");
    const user = parseJwt(localStorage.getItem("token"));
    try {
      const response = await axios.delete(`${config.apiUrl}/cart/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user_id: user.id,
          product_id: productId,
          count: count,
        },
      });
      fetchItemCart();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItemCart = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    const user = parseJwt(localStorage.getItem("token"));
    try {
      const response = await axios.get(`${config.apiUrl}/cart/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = response.data.products;
      setCartData(products);
      calculateCost(products); // Update the cost
      console.log(response.data.products);

      products.forEach((product: any) => {
        axios
          .get(`${config.apiUrl}/product-img/product/${product.id}`)
          .then((response) => {
            const imageUrl = response.data[0].url;
            setCartData((prevProducts: any) =>
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
            fetchCart()
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCost = (cartItems: any[]) => {
    const totalCost = cartItems.reduce(
      (acc, item) => acc + item.total_price * item.CartProducts.count,
      0
    );
    setCost(totalCost);
  };

  useEffect(() => {
    fetchItemCart();
  }, []);

  if (!localStorage.getItem("token")) {
    return <GuestCart />;
  }

  return (
    <>
      <div className="cart">
        <div className="cart__container">
          <h1>Корзина</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <div className="cart__table">
              <ul className="cart__list">
                {cartData.length > 0 ? (
                  cartData.map((item: any) => (
                    <li key={item.id}>
                      <img
                        src={item.image}
                        alt="Product"
                        className="cart__img"
                      />
                      <div className="cart__name">
                        <span>Название:</span>
                        {item.name}
                      </div>
                      <div className="cart__count">
                        <span>Кол-во:</span>
                        <div className="cart__count-input">
                          <button
                            onClick={() =>
                              decrementHandler(
                                item.id,
                                item.CartProducts.count
                              )
                            }
                          >
                            -
                          </button>
                          <span>{item.CartProducts.count}</span>
                          <button
                            type={"button"}
                            onClick={() => incrementHandler(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart__price">
                        <span>Цена:</span>{" "}
                        {(
                          item.total_price * item.CartProducts.count
                        ).toLocaleString()} ₽
                      </div>
                      <div
                        className="cart__delete"
                        onClick={() =>
                          deleteFromCart(item.id, item.CartProducts.count)
                        }
                      ></div>
                    </li>
                  ))
                ) : (
                  <li>Корзина пуста</li>
                )}

                {cartData.length > 0 && (
                  <li>
                    <Link to="/payment">
                      <button className="cart__buy">Оплатить</button>
                    </Link>
                    <span>Сумма: {cost.toLocaleString()} ₽</span>
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
