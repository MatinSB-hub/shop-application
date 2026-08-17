import React, { useState } from "react";

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
    image: [],
    sellers: [{ ...emptySeller }],
    filteredValues: [{ ...emptyPair }],
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
    image: [],
    sellers: [{ ...emptySeller }],
    filteredValues: [{ ...emptyPair }],
    customFields: [{ ...emptyPair }],
  });

    setSelectedCtegory(null);
  };

  const handleChangeCategory = (category) => {
    setSelectedCtegory(category);
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

  const updatePaire = (fieldName, index, key, value) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) =>
        i === index ? { ...item, [key]: value } : field,
      ),
    }));
  };

  const setImage = (files) => setField("images", files);

  const buildFormData = () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("description", form.description);

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

    ////////this code is different of course//////////////////////////////////
    const pairsToObject = (obj) => {
      return obj.map((item) => ({ [item.key]: item.value }));
    };
    /////////////////////////////////////////////////////////////////////////

    formData.append(
      "filteredValues",
      JSON.stringify(pairsToObject(filteredValues)),
    );
    formData.append(
      "customFields",
      JSON.stringify(pairsToObject(customFields)),
    );

    form.image.forEach((image) => formData.append("images", image));

    return formData;
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
    updatePaire,
    setImage,
    resetForm,
    buildFormData,
  };
}

export default useProductForm;
