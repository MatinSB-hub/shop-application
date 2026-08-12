import axios from "axios";
import api from "./api";

export const sendOTP = async (phone) => {
  try {
    const { data } = await api.post("/auth/send", { phone });
  } catch {
    console.log("hoho its here!!!!");
  }

  return data;
};

export const verifyOTP = async (phone, otp) => {
  const { data } = await api.post("/auth/verify", {
    phone: phone,
    otp: otp,
    isSeller: false,
  });

  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
};
