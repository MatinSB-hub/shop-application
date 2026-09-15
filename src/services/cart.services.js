import api from "./api";

export const getServerCart = async () => {
  const { data } = await api.get("cart");
  return data;
};

export const addToServerCart = async (body) => {
  const { data } = await api.post("cart/add", body);
  return data;
};
export const removeServerCart = async (body) => {
  const { data } = await api.delete("cart/remove", body);
  return data;
};
export const updateServerCart = async (body) => {
  const { data } = await api.post("/v1/cart/update", body);
  return data;
};
