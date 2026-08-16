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
  const [selectedCategory, setSelectedCtegory] = useState();

  const setFied = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
  const updateSeller = (index,key,value) => {
    setForm(prev=>({...prev,sellers:prev.sellers.map((seller,i) => i == index ? {...seller,[key]:value} : seller)}))
  };
  return <div>useProductForm</div>;
}

export default useProductForm;
