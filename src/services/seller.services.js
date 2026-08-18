`import api from "./api";

export const searchSellers = async (query) => {
  const { data } = await api.get(`sellers/search?q=${query}`);

  return data.data.sellers || []
};`
