import api from "./api";

const createProduct = async (formData) => {
  console.log("formData", [...formData.entries()]);
  try {
    const { data } = await api.post("/products", formData, {
      headers: "multipart/form-data",
    });
  } catch (err) {
    console.log(err.response);
  }

  return data;
};

export default createProduct;
