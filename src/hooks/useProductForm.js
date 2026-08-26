import React, { useState } from "react";
import { map } from "zod";

function useProductForm() {
  const emptySeller = {
    id: "",
    price: "",
    stock: 0,
  };
  const emptyPair = {
    key: "",
    value: "",
  };
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    images: [],
    sellers: [{ ...emptySeller }],
    filterValues: [{ ...emptyPair }],
    customFields: [{ ...emptyPair }],
  });

  const [selectedCategory, setSelectedCtegory] = useState(null);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
      images: [],
      sellers: [{ ...emptySeller }],
      filterValues: [{ ...emptyPair }],
      customFields: [{ ...emptyPair }],
    });

    setSelectedCtegory(null);
  };

  const handleChangeCategory = (category) => {
    setSelectedCtegory(category?._id);
  };

  const addSellers = () => {
    setForm((prev) => ({
      ...prev,
      sellers: [...prev.sellers, { ...emptySeller }],
    }));
  };

  const removeSeller = (index) => {
    setForm((prev) => ({
      ...prev,
      sellers: prev.sellers.filter((_, i) => i != index),
    }));
  };

  const updateSeller = (index, key, value) => {
    setForm((prev) => ({
      ...prev,
      sellers: prev.sellers.map((seller, i) =>
        i === index ? { ...seller, [key]: value } : seller,
      ),
    }));
  };

  const addPair = (fieldName) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], { ...emptyPair }],
    }));
  };

  const removePair = (fieldName, index) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i != index),
    }));
  };

  const updatePair = (fieldName, index, key, value) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    }));
  };

  const setImage = (files) => setField("images", files);

  const buildFormData = () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("subCategory", selectedCategory);

    const sellersPayload = () => {
      return form.sellers
        .filter((seller) => seller.id || seller.price)
        .map((seller) => ({
          id: seller.id,
          price: Number(seller.price),
          stock: Number(seller.stock),
        }));
    };

    formData.append("sellers", JSON.stringify(sellersPayload()));

    const pairsToObject = (list) => {
      return list.reduce((obj, { key, value }) => {
        if (key.trim()) obj[key.trim()] = value;
        return obj;
      }, {});
    };

    formData.append(
      "filterValues",
      JSON.stringify(pairsToObject(form.filterValues)),
    );
    formData.append(
      "customFields",
      JSON.stringify(pairsToObject(form.customFields)),
    );

    form.images.forEach((image) => formData.append("images", image));

    return formData;
  };

  const mapApiProductToForm = (productInfo) => {
    // تبدیل sellers از آرایه‌ای از آبجکت به فرمت فرم
    const sellers =
      productInfo.sellers?.length > 0
        ? productInfo.sellers.map((seller) => ({
            id: seller.seller || "",
            price: seller.price ? String(seller.price / 10) : "", // ریال به تومان
            stock: seller.stock || 0,
          }))
        : [{ id: "", price: "", stock: 0 }];

    // تبدیل customFields از آبجکت به آرایه‌ای از key/value
    const customFields = productInfo.customFields
      ? Object.entries(productInfo.customFields).map(([key, value]) => ({
          key: key,
          value: value,
        }))
      : [{ key: "", value: "" }];

    // تبدیل filterValues از آبجکت به آرایه‌ای از key/value
    const filterValues = productInfo.filterValues
      ? Object.entries(productInfo.filterValues).map(([key, value]) => ({
          key: key,
          value: value,
        }))
      : [{ key: "", value: "" }];

    return {
      name: productInfo.name || "",
      slug: productInfo.slug || "",
      description: productInfo.description || "",
      subCategory: productInfo.subCategory || "",
      images: productInfo.images || [],
      sellers: sellers,
      filterValues: filterValues,
      customFields: customFields,
    };
  };

  const setProdcutInfoToForm = (productInfo) => {
    const convertedData = mapApiProductToForm(productInfo);
    console.log("converted Data:", convertedData);
    setForm(convertedData);
  };

  return {
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
    // برای تبدیل اطلاعات محصول به اطلاعات فرم, در فرم ویرایش محصول
    setProdcutInfoToForm,
  };
}

export default useProductForm;
