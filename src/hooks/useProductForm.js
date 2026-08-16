import React, { useState } from "react";

function useProductForm() {
  const emptySeller = {
    id: "",
    price: "",
    stock: "",
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
    setField({
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

  return {
    form,
    setField,
    selectedCategory,
    setSelectedCtegory,
    addSellers,
    removeSeller,
    updateSeller,
    addPair,
    removePair,
    updatePaire,
    setImage,
    resetForm,
  };
}

export default useProductForm;
