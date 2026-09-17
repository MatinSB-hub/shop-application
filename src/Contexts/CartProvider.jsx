import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authContext } from "./AuthProvider";
import {
  addToServerCart,
  getServerCart,
  updateServerCart,
} from "../services/cart.services";
import { toast } from "sonner";
import {
  addGuestCartItem,
  getGuestCartItems,
  updateGuestCartItem,
} from "../lib/helpers/guestCart";

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

  const mergeGuestCartIntoServer = async () => {
    const guestCart = getGuestCartItems();
    if (!guestCart.length) return;

    let faildCount = 0;
    for (const item of items) {
      try {
        await addToServerCart({
          productId: item.productId,
          sellerId: item.sellerId,
          quantity: item.quantity,
        });
      } catch {
        faildCount += 1;
      }
    }

    if (faildCount > 0) {
      toast.info(`${faildCount} مورد از سبد قبلی شما اضافه نشد`);
    }

    clearGuestCart();
  };

  const addToCart = async (item) => {
    try {
      setIsLoading(true);
      if (user) {
        const response = await addToServerCart({
          productId: item.productId,
          sellerId: item.sellerId,
          quantity: item.quantity,
        });

        setItems(response?.data?.cart?.items || []);
      } else {
        setItems(addGuestCartItem(item));
      }
    } catch (err) {
      toast.error(
        err.response.data.message || "خطا در اضافه کردن محصول به سبد خرید",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (productId, sellerId) => {
    if (user) {
      try {
        setIsLoading(true);
        const response = removeServerCart({ productId, sellerId });
        setItems(response?.data?.cart?.items);
      } catch (err) {
        toast.error("خطا در حذف محصول از سبد");
      } finally {
        setIsLoading(false);
      }
    } else {
      removeGuestCartItem(productId, sellerId);
    }
  };

  const updateItems = async (productId, sellerId, quantity) => {
    try {
      if (user) {
        const response = await updateServerCart({
          productId,
          sellerId,
          quantity,
        });
        setItems(response?.data?.cart?.items || []);
      } else {
        updateGuestCartItem(productId, sellerId, quantity);
      }
    } catch (err) {
      toast.error("خطا در ویرایش سبد خرید");
    }
  };

  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (authIsLoading) return;
    let cancelled = false;

    const syncCart = async () => {
      setIsLoading(true);

      try {
        if (user) {
          await mergeGuestCartIntoServer();
          if (cancelled) return;
          await fetchServerCart();
        } else {
          setItems(getGuestCartItems());
        }
      } catch (err) {
        toast.error("خطا در سینک سبد خرید");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    syncCart();

    return () => {
      cancelled = true;
    };
  }, [user, authIsLoading]);

  const value = {
    items,
    itemsCount,
    isLoading,
    updateItems,
    removeItem,
    addToCart,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export default CartProvider;
