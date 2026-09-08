export const createCommet = async (comment) => {
  const { data } = await api.post("/comments", comment);
  return data;
};
