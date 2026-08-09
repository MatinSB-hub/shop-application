import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import validate from "../validators";
import * as authServices from "../services/auth.services";
import { toast } from "sonner";
import { sendOTPSchema, verifyOTPSchema } from "../validators/auth";
import useCountDown from "./useCountDown";
import { authContext } from "../Contexts/authProvider";

function useAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setotp] = useState("");
  const [isSentOtp, setIsSentOtp] = useState(false);
  const {refreshUser} = useContext(authContext)

  const { isRunning, isExpired, convertedTimeFormat, restart } =
    useCountDown(120);

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
      toast.info("کد به شماره موبایل وارد شده ارسال شد");
      setIsSentOtp(true);
      restart();
    }
  };

  const reSendOtp = async () => {
    if (validate(sendOTPSchema, { phone })) {
      const data = await authServices.sendOTP(phone);
      toast.info("کد جدید ارسال شد");
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
    await refreshUser()
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
