import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Account from "../pages/Authentication/Account/Account";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "account",
        Component: Account,
      },
      {
        path: "change-password",
        Component: ForgotPassword,
      },
    ],
  },
]);

export default router;
