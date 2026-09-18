import { useContext, useState } from "react";
import { HiTrash } from "react-icons/hi2";
import { cartContext } from "../../../../../Contexts/CartProvider";

const ClearBasket = ({ items }) => {
  const { clearCart } = useContext(cartContext);
  const [isClearing, setIsClearing] = useState(false);
  console.log(items);

  const clearCartHandler = async () => {
    try {
      setIsClearing(true);
      await clearCart(items);
    } finally {
      setIsClearing(false);
    }
  };
  return (
    <button
      className="rounded-md  flex-center px-3 py-2  gap-1 hover:bg-red-500/10 text-red-500"
      disabled={isClearing}
      onClick={clearCartHandler}
    >
      <HiTrash />
      <span className="text-sm font-semibold">
        {isClearing ? "درحال خالی کردن سبد خرید..." : "پاکسازی سبد خرید"}
      </span>
    </button>
  );
};

export default ClearBasket;
