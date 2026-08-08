import React, { useState } from "react";
import { useNavigate } from "react-router";
import validate from "../validators";
import * as authServices from "../services/auth.services";
import { toast } from "sonner";
import { sendOTPSchema, verifyOTPSchema } from "../validators/auth";
import useCountDown from "./useCountDown";

function useAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setotp] = useState("");
  const [isSentOtp, setIsSentOtp] = useState(false);

  const { timeLeft, isRunning,isExpired, convertedTimeFormat, restart } = useCountDown(20);

  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleOtpChange = (e) => {
    setotp(e.target.value);
  };

  const sendOtp = async () => {
    if (validate(sendOTPSchema, { phone })) {
      const data = await authServices.sendOTP(phone);
      console.log("sendOtp:", data);
      setIsSentOtp(true);
      restart();
    }
  };

  const reSendOtp = async () => {
    if (validate(sendOTPSchema, { phone })) {
      const data = await authServices.sendOTP(phone);
      console.log("reSendOtp:", data);
      restart();
    }
  };

  const verifyOtp = async () => {
    if (validate(verifyOTPSchema, { phone, otp })) {
      const data = await authServices.verifyOTP(phone, otp);
      setIsSentOtp(false);
      console.log("verifyOTp:", data);
      return data;
    }
  };

  const login = async () => {
    const data = await verifyOtp();
    if (!data) return;

    toast.success("ورود موفق");

    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSentOtp) {
      login();
    } else {
      sendOtp();
    }
  };

  return {
    phone,
    otp,
    isSentOtp,
    handlePhoneChange,
    handleOtpChange,
    handleSubmit,
    reSendOtp,
    isRunning,
    isExpired,
    convertedTimeFormat,
  };
}

export default useAuth;
