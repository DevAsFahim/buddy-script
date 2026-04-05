import { createBrowserRouter, Navigate } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Feed from "../pages/feed/Feed";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "../layout/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
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
