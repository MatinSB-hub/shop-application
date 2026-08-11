import React from "react";
import { SlLogout } from "react-icons/sl";
import NavItem from "../../Common/Sidebar/fragments/NavItem";

function Logout() {
  return (
    <NavItem
      bgColor="bg-gray-500"
      iconColor="text-gary-500"
      icon={<SlLogout />}
      href="/"
      lable="خروج از حساب"
    />
  );
}

export default Logout;
