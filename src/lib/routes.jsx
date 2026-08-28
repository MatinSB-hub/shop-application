/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, redirect } from "react-router-dom";
import AboutUSPage from "../Pages/AboutUS.jsx";
import BlogPage from "../Pages/Blog.jsx";
import CartPage from "../Pages/Cart.jsx";
import ContactUSPage from "../Pages/ContactUS.jsx";
import HomePage from "../Pages/HomePage.jsx";
import ProductPage from "../Pages/Product.jsx";

import AppLayout from "../Components/Layouts/AppLayout.jsx";
import AuthLayout from "../Components/Layouts/AuthLayout.jsx";
import AuthPage from "../Pages/Auth.jsx";
import CMSLaout from "../Components/Layouts/CMSLaout.jsx";
import { useContext } from "react";
import { getMe } from "../services/auth.services.js";
import Forbidden from "../Pages/Forbidden.jsx";
import NotFound from "../Pages/NotFound.jsx";
import ModeratorsProducts from "../Pages/DashBoard/moderator/products/page.jsx";
import ModeratorCategoriesTable from "../Pages/DashBoard/templates/moderator/categories/ModeratorCategoriesTable.jsx";
import ModeratorCategories from "../Pages/DashBoard/moderator/categories/page.jsx";
// const test = useContext(authContext)

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about-us", element: <AboutUSPage /> },
      { path: "contact-us", element: <ContactUSPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "product/:productID", element: <ProductPage /> },
      { path: "blog/:blogID", element: <BlogPage /> },
      { path: "forbidden", element: <Forbidden /> },

      {
        path: "auth",
        element: <AuthLayout />,
        children: [{ index: true, element: <AuthPage /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: <CMSLaout />,
    children: [
      {
        path: "moderator",
        loader: async () => {
          try {
            const { data } = await getMe();
            if (!data.user.roles.includes("ADMIN")) {
              return redirect("/forbidden");
            }

            return data.user;
          } catch (err) {
            return redirect("/auth");
          }
        },
        children: [
          { index: true, loader: () => redirect("home") },
          { path: "home", element: <div>home page</div> },
          { path: "orders", element: <div>orders page</div> },
          { path: "products", element: <ModeratorsProducts/> },
          { path: "categories", element: <ModeratorCategories/> },
        ],
      },
    ],
  },
]);

export default router;
