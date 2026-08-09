import React, { createContext, useEffect, useState } from "react";
import { getMe } from "../services/auth.services";

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

  const refreshUser = () => {
    initAuth()
  };

  const value = { user, isLoading, refreshUser };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
