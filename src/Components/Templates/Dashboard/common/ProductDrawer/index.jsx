import React from "react";
import Drawer from "../Drawer";

// mode: CREATE | EDIT
const ProductDrawer = ({ isOpen, onToggle }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onToggle} title="ایجاد محصول">
      {/*  */}
    </Drawer>
  );
};

export default ProductDrawer;
