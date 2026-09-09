import api from "./api";

export const createComment = async (comment) => {
  const { data } = await api.post("/comments", comment);
  return data;
};
