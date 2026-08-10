import React from "react";
import { Outlet } from "react-router";

function CMSLaout() {
  return (
    <div>
      <span>CMSLayout</span>
      <Outlet />
    </div>
  );
}

export default CMSLaout;
