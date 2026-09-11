import api from "./api";

export const createComment = async (comment) => {
  const { data } = await api.post("/comments", comment);
  return data;
};

export const getProductComments = async (info) => {
  const { data } = await api.get("comments", info);
  return data;
};
