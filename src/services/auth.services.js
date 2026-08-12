import axios from "axios";

export const sendOTP = async (phone) => {
  const { data } = await axios.post(
    "https://shopino.iran.liara.run/v1/auth/send",
    {
      phone,
    },
  );

  return data;
};

export const verifyOTP = async (phone, otp) => {
  const { data } = await axios.post(
    "https://shopino.iran.liara.run/v1/auth/verify",
    {
      phone: phone,
      otp: otp,
      isSeller: false,
    },
    {
      withCredentials: true,
    },
  );

  return data;
};

export const getMe = async () => {
  const { data } = await axios.get(
    "https://shopino.iran.liara.run/v1/auth/me",
    { withCredentials: true },
  );
  return data;
};

export const logout = async () => {
  const { data } = await axios.post(
    "https://shopino.iran.liara.run/v1/auth/logout",{},
    { withCredentials: true },
  );
};
