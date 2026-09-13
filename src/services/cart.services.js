import api from "./api";

export const getCart = async () => {
  const { data } = await api.get("cart");
  return data;
};

export const addToCart = async (body) => {
  const { data } = await api.post("cart/add", body);
  return data;
};
export const removeFromCart = async (body) => {
  const { data } = await api.delete("cart/remove", body);
  return data;
};
export const updateCart = async (body) => {
  const { data } = await api.post("/v1/cart/update", body);
  return data;
};
