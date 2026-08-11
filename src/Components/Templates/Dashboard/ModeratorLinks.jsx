import React from "react";
import NavItme from "../../Common/Sidebar/fragments/NavItem/index.jsx";
import { BiDollar, BiHome } from "react-icons/bi";
import { BsBox2, BsShop } from "react-icons/bs";
import { FaShop, FaTruckArrowRight } from "react-icons/fa6";

function ModeratorLinks() {
  return (
    <>
      <NavItme
      bgColor="bg-red-500"
      iconColor="text-red-500"
        icon={<BiHome />}
        href="/dashboard/moderator/home"
        lable="پیشخوان"
      />
      <NavItme
      bgColor="bg-yellow-500"
      iconColor="text-yellow-500"
        icon={<BsBox2 />}
        href="/dashboard/moderator/products"
        lable="محصولات"
      />
      <NavItme
      bgColor="bg-green-500"
      iconColor="text-green-500"
        icon={<FaTruckArrowRight />}
        href="/dashboard/moderator/orders"
        lable="سفارشات"
      />
      <NavItme
      bgColor="bg-purple-500"
      iconColor="text-purple-500"
        icon={<BsShop />}
        href="/dashboard/moderator/sellers"
        lable="فروشنده ها"
      />
      <NavItme
      bgColor="bg-blue-500"
      iconColor="text-blue-500"
        icon={<BiDollar />}
        href="/dashboard/moderator/offers"
        lable="تخفیف ها"
      />
    </>
  );
}

export default ModeratorLinks;
