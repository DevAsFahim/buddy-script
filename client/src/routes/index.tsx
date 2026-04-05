import { createBrowserRouter, Navigate } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Feed from "../pages/feed/Feed";
import MainLayout from "../layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/feed" replace />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
