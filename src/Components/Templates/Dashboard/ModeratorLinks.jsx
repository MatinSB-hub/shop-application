import React from "react";
import NavItme from "../../Common/Sidebar/fragments/NavItem/index.jsx";
import { BiDollar, BiHome, BiCategoryAlt } from "react-icons/bi";
import { BsBox2, BsShop } from "react-icons/bs";
import { FaTruckArrowRight } from "react-icons/fa6";
import { PiUsers } from "react-icons/pi";

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
          bgColor="bg-cyan-500"
          iconColor="text-cyan-500"
          icon={<PiUsers />}
          href="/dashboard/moderator/users"
          lable="کاربران"
        />
      <NavItme
        bgColor="bg-yellow-500"
        iconColor="text-yellow-500"
        icon={<BsBox2 />}
        href="/dashboard/moderator/products"
        lable="محصولات"
      />
      <NavItme
        bgColor="bg-orange-500"
        iconColor="text-orange-500"
        icon={<BiCategoryAlt />}
        href="/dashboard/moderator/categories"
        lable="دسته بندی ها"
      />
        <NavItme
          bgColor="bg-purple-500"
          iconColor="text-purple-500"
          icon={<BsShop />}
          href="/dashboard/moderator/sellers"
          lable="فروشنده ها"
        />
      <NavItme
        bgColor="bg-green-500"
        iconColor="text-green-500"
        icon={<FaTruckArrowRight />}
        href="/dashboard/moderator/orders"
        lable="سفارشات"
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
