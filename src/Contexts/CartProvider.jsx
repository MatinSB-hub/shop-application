import React, { Children, createContext, useContext, useState } from "react";
import { authContext } from "./AuthProvider";

export const cartContext = createContext();

function CartProvider({ children }) {
  const { user, isLoading: authIsLoading } = useContext(authContext);
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <cartContext.Provider value={"undefined"}>{children}</cartContext.Provider>
  );
}

export default CartProvider;
