import React, { useContext } from "react";
import { SlLogout } from "react-icons/sl";
import NavItem from "../../Common/Sidebar/fragments/NavItem";
import axios from "axios";
import { toast } from "sonner";
import useContactUs from "../../../hooks/useContactUs";
import { authContext } from "../../../Contexts/authProvider";
import { replace, useNavigate } from "react-router";

function Logout() {
  const { logoutUser, refreshUser } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/", { replace: true });
      refreshUser();
    }
  };

  return (
    <div
      className="w-full h-max flex items-center gap-3 duration-150 transition-all hover:bg-zinc-100/70 p-1.5 rounded-lg relative cursor-pointer"
      onClick={handleLogout}
    >
      <div
        className={` size-10 rounded-lg flex items-center justify-center text-xl relative overflow-hidden text-gray-500`}
      >
        <span
          className={`size-full absolute z-0 opacity-15 inset-0 bg-gray-500`}
        ></span>
        <SlLogout />
      </div>
      <span className="text-sm text-zinc-600 ">خروج از حساب</span>
    </div>
  );
}

export default Logout;
