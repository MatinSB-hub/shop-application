import api from "./api";

//Category
export const getAllCategories = async () => {
  const { data } = await api.get("/category");
  return data;
};

export const createCategory = async (formData) => {
  try {
    console.log([...formData.entries()]);
    const { data } = await api.post("/category", formData);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const updateCategory = async (categoryId, formData) => {
  const { data } = await api.put(`/category/${categoryId}`, formData);
  return data;
};

export const removeCategory = async (categoryId) => {
  const { data } = await api.delete(`/category/${categoryId}`);
  return data;
};

//subCategory
export const getAllSubCategories = async () => {
  const { data } = await api.get("/category/sub");
  return data;
};

export const createSubCategory = async (formData) => {
  const { data } = await api.post("/category/sub", formData);
  return data;
};

export const updateSubCategory = async (categoryId, formData) => {
  const { data } = await api.put(`/category/sub/${categoryId}`, formData);
  return data;
};

export const removeSubCategory = async (categoryId) => {
  const { data } = await api.delete(`/category/sub/${categoryId}`);
  return data;
};
