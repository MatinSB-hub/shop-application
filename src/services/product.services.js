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

export const removeProduct = async (productId) => {
  const res = await api.delete(`/products/${productId}`);
  return res;
};

export const updateProducts = async(productId,formData)=>{
  console.log([...formData.entries()])
  const res = await api.patch(`/products/${productId}`,[...formData.entries()])
  return res;
}

export default createProduct;
