import React from "react";
import Variant from "./Variant";

const ProductVariants = ({ customFields }) => {
  
  return (
    <div className="space-y-3">
      <p className="text-xs font-black text-slate-600">ویژگی‌ها:</p>

      <div className="grid grid-cols-3 gap-1.5">
        {Object.entries(customFields || {}).map(([title,value],index) => (
          <Variant key={index} title={title} value={value}/>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;
