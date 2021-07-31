import { lazy } from "react";

const Login = lazy(() => import("../Pages/Login"));
const SignUp = lazy(() => import("../Pages/SignUp"));
const Home = lazy(() => import("../Pages/Home"));
const Page404 = lazy(() => import("../Pages/Page404"));

export const privateRoutes = [
  {
    path: "/dashboard",
    component: Home,
  },
];

export const publicRoutes = [
  {
    path: "/auth/login",
    component: Login,
  },
  {
    path: "/auth/signup",
    component: SignUp,
  },
  {
    path: "/404",
    component: Page404,
  },
];
