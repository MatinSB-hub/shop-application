import React, { createContext, useEffect, useState } from "react";
import { getMe, logout } from "../services/auth.services";

export const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const initAuth = async () => {
    try {
      setIsLoading(true);
      const response = await getMe();
      setUser(response.data.user);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    initAuth();
  }, []);

  const logoutUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await logout();
      if (data.success) {
        toast.success("با موفقیت خارج شدید");
      } else {
        toast.error("خطا در خروج از حساب");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const refreshUser = () => {
    initAuth();
  };

  const value = { user, isLoading, refreshUser, logoutUser };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
