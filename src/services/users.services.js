import api from "./api";

export const getAllUsers = async (page,limit) => {
  const { data } = await api.get("/users",{params:{
    page:page
  }});
  return data;
};

export const banUser = async (userId) => {
  const { data } = await api.post(`/users/ban/${userId}`);
  return data;
};
