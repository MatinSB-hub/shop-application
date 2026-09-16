import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authContext } from "./AuthProvider";
import { addToServerCart, getServerCart } from "../services/cart.services";
import { toast } from "sonner";
import { addGuestCartItem, getGuestCartItems } from "../lib/helpers/guestCart";

export const cartContext = createContext();

function CartProvider({ children }) {
  const { user, isLoading: authIsLoading } = useContext(authContext);
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchServerCart = async () => {
    try {
      const response = await getServerCart();
      const cart = response?.data?.cart;
    } catch (err) {
      if (err?.response?.status === 404) {
        setItems([]);
      } else {
        toast.error("خطا در دریافت سبد خرید");
      }
    }
  };

  const mergeGuestCartIntoServer = async () => {};

  const addToCart = async (items) => {
    try {
      setIsLoading(true);
      if (user) {
        const response = await addToServerCart({
          productId: items.productId,
          sellerId: items.sellerId,
          quantity: items.quantity,
        });

        setItems(response?.data?.cart?.items || []);
      } else {
        setItems(addGuestCartItem(items));
      }
    } catch (err) {
      toast.error(
        err.response.data.message || "خطا در اضافه کردن محصول به سبد خرید",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authIsLoading) true;

    const syncCart = async () => {
      setIsLoading(false);
      if (user) {
        await mergeGuestCartIntoServer();
        await fetchServerCart();
      } else {
        setItems(getGuestCartItems());
      }

      setIsLoading(false);
    };

    syncCart();
  }, [user, authIsLoading]);

  const value = { items };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export default CartProvider;
