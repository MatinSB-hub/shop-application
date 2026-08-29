import api from "./api";

export const getAllCategories = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const banUser = async (userId) => {
  const { data } = await api.post(`/users/ban/${userId}`);
  return data;
};
