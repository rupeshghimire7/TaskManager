import type { RouteObject } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

const routes: RouteObject[] = [
  {
    path: "/",
    // if user is authenticated, he/she should view Home page, else they should see login page
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]

export default routes
