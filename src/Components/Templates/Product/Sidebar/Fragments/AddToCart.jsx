import { useContext, useState } from "react";
import { cartContext } from "../../../../../Contexts/CartProvider";
import { toast } from "sonner";

const AddToCart = ({
  productId,
  sellerId,
  name,
  slug,
  image,
  price,
  stock,
}) => {
  const { addItem } = useContext(cartContext);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const addToCartHandler = async () => {
    if (!sellerId) {
      toast.error("این محصول در حال حاضر فروشنده ای ندارد");
      return;
    }

    if (stock <= 0) {
      toast.error("این محصول موجود نیست");
      return;
    }

    try {
      setIsSubmiting(true);
      console.log("add items data:", {
        productId,
        sellerId,
        name,
        slug,
        quantity: 1,
        image,
        price,
        stock,
      });
      await addItem({
        productId,
        sellerId,
        name,
        slug,
        quantity: 1,
        image,
        price,
        stock,
      });
    } catch {
      setIsSubmiting(false);
    }
  };
  return (
    <button
      className=" h-10 text-xs bg-blue-500 text-white w-full rounded-md ring-blue-500/40"
      onClick={addToCartHandler}
      disabled={isSubmiting}
    >
      {isSubmiting ? "درحال افروزدن به سبد..." : "افزودن به سبد خرید"}
    </button>
  );
};

export default AddToCart;
