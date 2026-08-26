import React, { useEffect, useState } from "react";
import Drawer from "../Drawer";
import ProductDrawerInput from "./ProductDrawerInput";
import useCategories from "../../../../../hooks/useCategories";
import CascadeCategories from "./CascadeCategories";
import useProductForm from "../../../../../hooks/useProductForm";
import createProduct, {
  updateProducts,
} from "../../../../../services/product.services";
import { toast } from "sonner";
import DynamicKeyValueFields from "./DynamicKeyValueFields";
import SellerFields from "./SellerFields";
import ImageUploadField from "./ImageUploadField";
import useProducts from "../../../../../hooks/useProducts";

// mode: CREATE | EDIT
const ProductDrawer = ({ isOpen, onToggle, editingMode }) => {
  const { isLoading: categoriesIsLoading, categories } = useCategories();
  const [error, setError] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(null);
  const {
    form,
    setField,
    selectedCategory,
    handleChangeCategory,
    addSellers,
    removeSeller,
    updateSeller,
    addPair,
    removePair,
    updatePair,
    setImage,
    resetForm,
    buildFormData,
    setProdcutInfoToForm,
  } = useProductForm();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setError(null);
    } else {
      if (!!editingMode) {
        setProdcutInfoToForm(editingMode);
      }
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.slug.trim() || !form.description.trim()) {
      setError("عنوان , توضیحات و لینک محصول الزامی هستند");
      return;
    }

    if (!selectedCategory) {
      setError("انتخاب دسته بندی محصول الزامی هست");
      return;
    }

    setError(null);

    try {
      setIsSubmiting(true);
      if (!!editingMode) {
        const data = await updateProducts(editingMode._id, buildFormData());
        console.log("data edit:",data)
        toast.success(`محصول ${form.name}  با موفقیت ویرایش شد`);
      } else {
        await createProduct(buildFormData());
        toast.success(`محصول ${form.name}  با موفقیت ایجاد شد`);
      }
      resetForm();
      onToggle();
    } catch (err) {
      setError(err.response?.data?.message || "خطایی رخ داده است");
    } finally {
      setIsSubmiting(false);
    }
  };
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onToggle}
      title={editingMode ? "ویرایش محصول" : "ایجاد محصول"}
    >
      <ProductDrawerInput
        label="عنوان محصول"
        placeholder="iphone-17-promax"
        type="text"
        value={form.name}
        onChange={(e) => setField("name", e.target.value)}
      />

      <ProductDrawerInput
        label="لینک"
        placeholder="iphone-17-promax"
        type="text"
        value={form.slug}
        onChange={(e) => setField("slug", e.target.value)}
      />

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-2 block mt-2">
          دسته بندی
        </label>
        {categoriesIsLoading ? (
          <p className="text-sm text-zinc-400">در حال بارگزاری ...</p>
        ) : (
          <CascadeCategories
            categories={categories}
            onChange={handleChangeCategory}
          />
        )}
      </div>

      <SellerFields
        lable={"ویژگی های فیلتری"}
        sellers={form.sellers}
        onAdd={() => addSellers()}
        onRemove={(index) => removeSeller(index)}
        onChange={(index, key, value) => updateSeller(index, key, value)}
      />

      <DynamicKeyValueFields
        lable={"ویژگی های فیلتری"}
        items={form.filterValues}
        onAdd={() => addPair("filterValues")}
        onRemove={(index) => removePair("filterValues", index)}
        onChange={(index, key, value) =>
          updatePair("filterValues", index, key, value)
        }
        keyPlaceHolder={"مثلا (حافظه داخلی)"}
        valuePlaceHolder={"مثلا (16 گیگابایت)"}
      />

      <DynamicKeyValueFields
        lable={"ویژگی های سفارشی"}
        items={form.customFields}
        onAdd={() => addPair("customFields")}
        onRemove={(index) => removePair("customFields", index)}
        onChange={(index, key, value) =>
          updatePair("customFields", index, key, value)
        }
        keyPlaceHolder={"مثلا (سنسور)"}
        valuePlaceHolder={"مثلا (مادون قرمز)"}
      />

      <ImageUploadField files={form.images} onChange={setImage} />

      <div className="space-y-4 mt-5 px-6">
        <div>
          <label htmlFor="product-details"> توضیحات محصول </label>
          <textarea
            id="product-details"
            name=""
            className="w-full h-10 text-sm rounded-md outline-none primary-border px-3 mt-2 min-h-30 pt-2"
            placeholder=" آیفون - ارزان - تخفیف دار"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
          ></textarea>
        </div>

        {error && <span className="text-sm text-red-500">{error}</span>}

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/15 "
            onClick={onToggle}
          >
            انصراف
          </button>
          <button
            className="px-4 py-2 rounded-md bg-linear-to-t from-blue-600 text-sm to-blue-500 text-white"
            onClick={handleSubmit}
            disabled={isSubmiting}
          >
            {isSubmiting
              ? "در حال ثبت..."
              : !!editingMode
                ? "ویرایش محصول"
                : "ایجاد محصول"}
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
