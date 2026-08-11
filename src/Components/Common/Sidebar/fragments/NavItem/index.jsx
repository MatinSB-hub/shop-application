import React from "react";
import { Link, NavLink } from "react-router";

function index({ lable = "", href, icon, bgColor, iconColor }) {
  return (
    <NavLink
      to={href}
      className={
        "flex items-center gap-3 duration-150 transition-all hover:bg-zinc-100/70 p-1.5 rounded-lg relative"
      }
    >
      {(Link) => (
        <>
          {Link.isActive && (
            <>
              <div
                className={`absolute w-full h-full ${bgColor} rounded-lg opacity-15 -mr-2 `}
              />
              <div
                className={`absolute w-1 h-[80%] ${bgColor} rounded-2xl -mr-2`}
              ></div>
            </>
          )}
          <div
            className={` size-10 rounded-lg flex items-center justify-center text-xl relative overflow-hidden ${iconColor}`}
          >
            <span
              className={`size-full absolute z-0 opacity-15 inset-0 ${bgColor}`}
            ></span>
            {icon}
          </div>
          <span className="text-sm text-zinc-600 ">{lable}</span>
        </>
      )}
    </NavLink>
  );
}

export default index;
