import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import parseJwt from "../jwtUtils";
import config from "../config";

export interface CartContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
  fetchCart: () => Promise.resolve(),
});

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = parseJwt(localStorage.getItem("token"));
      try {
        const response = await axios.get(`${config.apiUrl}/cart/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const products = response.data.products;
        setCartCount(products.length);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      const guestCart = localStorage.getItem("guestCart");
      if (guestCart) {
        const parsedGuestCart = JSON.parse(guestCart);
        setCartCount(parsedGuestCart.length);
      }
    }
  };

  const cartContextValue: CartContextType = {
    cartCount,
    setCartCount,
    fetchCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
