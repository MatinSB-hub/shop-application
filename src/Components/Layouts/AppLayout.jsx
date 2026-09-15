import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { Toaster } from "sonner";
import AuthProvider from "../../Contexts/AuthProvider";
import CartProvider from "../../Contexts/CartProvider";

const AppLayout = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollRestoration />
        <Toaster position="top-right" richColors />
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default AppLayout;
