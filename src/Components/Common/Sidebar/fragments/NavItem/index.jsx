import React from "react";
import { NavLink } from "react-router";

function index({ lable = "", href, icon, bgColor, iconColor }) {
  return (
    <NavLink
      to={href}
      className={
        "flex items-center gap-3 duration-150 transition-all hover:bg-zinc-100/70 p-1.5 rounded-lg relative"
      }
    >
      <div className="size-10 rounded-lg flex items-center justify-center text-xl relative overflow-hidden">
        <span className="size-full absolute z-0 opacity-15 inset-0"></span>
      </div>
      <span className="text-sm text-zinc-600 ">{lable}</span>
    </NavLink>
  );
}

export default index;
