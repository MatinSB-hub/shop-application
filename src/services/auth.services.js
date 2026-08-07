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
  );

  return data;
};
