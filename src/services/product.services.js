import api from "./api";

const createProduct = async (formData) => {
  console.log("formData", [...formData.entries()]);
  try {
    const { data } = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const getAllProducts = async (params) => {
  const { data } = await api.get("/products", { params });
  return data;
};

export default createProduct;
