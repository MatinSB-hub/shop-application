import React from "react";
import MiniProduct from "./Fragments/MiniProduct";
import AddToCart from "./Fragments/AddToCart";
import NoticeDescription from "./Fragments/NoticeDescription";
import Price from "./Fragments/Price";
import Counseling from "./Fragments/Counseling";

const Sidebar = ({ name, sellers ,images}) => {
  console.log("sellers:",sellers)
  return (
    <aside className="col-span-2 w-full rounded-xl border border-neutral-200 max-h-max sticky top-5 p-5 space-y-5">
      <MiniProduct name={name} images={images} />
      <NoticeDescription />
      <Price price={sellers && sellers[0].price} />
      <AddToCart />
      <Counseling />
    </aside>
  );
};

export default Sidebar;
