import React from "react";
import Drawer from "../Drawer";
import ProductDrawerInput from "./ProductDrawerInput";
import useCategories from "../../../../../hooks/useCategories";
import CascadeCategories from "./CascadeCategories";

// mode: CREATE | EDIT
const ProductDrawer = ({ isOpen, onToggle }) => {
  const { isLoading: categoriesIsLoading, categories } = useCategories();
  return (
    <Drawer isOpen={isOpen} onClose={onToggle} title="ایجاد محصول">
      <ProductDrawerInput
        label="عنوان محصول"
        placeholder="iphone-17-promax"
        type="text"
      />
      <ProductDrawerInput
        label="تصویر محصول"
        placeholder="iphone-17-promax"
        type="file"
      />

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-2 block mt-2">
          دسته بندی
        </label>
        {categoriesIsLoading ? <p className="text-sm text-zinc-400">در حال بارگزاری ...</p> : <CascadeCategories categories={categories}/>}
      </div>

      <div className="space-y-4 mt-5 px-6">
        <div>
          <label htmlFor="product-details"> توضیحات محصول </label>
          <textarea
            id="product-details"
            name=""
            className="w-full h-10 text-sm rounded-md outline-none primary-border px-3 mt-2 min-h-30 pt-2"
            placeholder=" آیفون - ارزان - تخفیف دار"
          ></textarea>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button className="px-4 py-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/15 ">
            انصراف
          </button>
          <button className="px-4 py-2 rounded-md bg-linear-to-t from-blue-600 text-sm to-blue-500 text-white">
            ایجاد محصول
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
