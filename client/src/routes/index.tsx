import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Feed from "../pages/feed/Feed";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Feed />
    },
    {
        path: '/feed',
        element: <Feed />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
])