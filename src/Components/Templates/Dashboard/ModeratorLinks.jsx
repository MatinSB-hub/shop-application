import React from "react";
import NavItme from "../../Common/Sidebar/fragments/NavItem/index.jsx";
function ModeratorLinks() {
  return (
    <>
      <NavItme href="/dashboard/moderator/home" lable="پیشخوان" />
      <NavItme href="/dashboard/moderator/products" lable="محصولات" />
      <NavItme href="/dashboard/moderator/orders" lable="سفارشات" />
      <NavItme href="/dashboard/moderator/tickets" lable="تیکت ها" />
      <NavItme href="/dashboard/moderator/sellers" lable="فروشنده ها" />
      <NavItme href="/dashboard/moderator/offers" lable="تخفیف ها" />
    </>
  );
}

export default ModeratorLinks;
