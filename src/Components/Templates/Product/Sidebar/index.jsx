import React from "react";
import MiniProduct from "./Fragments/MiniProduct";
import AddToCart from "./Fragments/AddToCart";
import NoticeDescription from "./Fragments/NoticeDescription";
import Price from "./Fragments/Price";
import Counseling from "./Fragments/Counseling";

const Sidebar = ({ sellers, ...product }) => {
  const firstSeller = sellers?.[0]?.seller;
  const image = product?.images && product?.images[0];
  console.log("firstSeller:", firstSeller);

  return (
    <aside className="col-span-2 w-full rounded-xl border border-neutral-200 max-h-max sticky top-5 p-5 space-y-5">
      <MiniProduct name={product?.name} images={product?.images} />
      <NoticeDescription />
      <Price price={sellers && sellers[0].price} />
      <AddToCart
        productId={product?._id}
        sellerId={firstSeller?._id}
        name={product?.name}
        slug={product?.slug}
        image={image}
        price={product?.price}
        stock={firstSeller?.stock}
      />
      <Counseling />
    </aside>
  );
};

export default Sidebar;
