import { useContext } from "react";
import Checkout from "../Components/Templates/Cart/Checkout";
import CartProduct from "../Components/Templates/Cart/Content/Fragments/CartProduct";
import CartTitle from "../Components/Templates/Cart/Content/Fragments/CartTitle";
import ClearBasket from "../Components/Templates/Cart/Content/Fragments/ClearBasket";
import { EmptyBasket } from "../Components/Templates/Cart/EmptyBasket";
import { cartContext } from "../Contexts/CartProvider";

const CartPage = () => {
  const { itemsCount, items } = useContext(cartContext);
  console.log("cart page items",items);
  if (!itemsCount) {
    return <EmptyBasket />;
  } else {
    return (
      <main id="cart-page" className="my-10 container grid grid-cols-9 gap-5">
        <div id="cart-content" className="col-span-6">
          <div className="flex-between">
            <CartTitle itemsCount={itemsCount} />
            <ClearBasket items={items} />
          </div>

          <div id="cart-products-container" className=" space-y-4 mt-2">
            {items.map((item, index) => (
              <CartProduct key={index} {...item} />
            ))}
          </div>
        </div>
        <Checkout items={items}/>
      </main>
    );
  }
};

export default CartPage;
