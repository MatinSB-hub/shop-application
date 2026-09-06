import React from "react";
import { TfiBackLeft } from "react-icons/tfi";

import { Link } from "react-router";

function BackTohome() {
  return (
    <Link
      to={"/"}
      className="w-full h-max flex items-center gap-3 duration-150 transition-all hover:bg-zinc-100/70 p-1.5 rounded-lg relative cursor-pointer"
    >
      <div
        className={` size-10 rounded-lg flex items-center justify-center text-xl relative overflow-hidden text-gray-500`}
      >
        <span
          className={`size-full absolute z-0 opacity-15 inset-0 bg-gray-500`}
        ></span>
        <TfiBackLeft />
      </div>
      <span className="text-sm text-zinc-600 ">صفحه اصلی</span>
    </Link>
  );
}

export default BackTohome;
