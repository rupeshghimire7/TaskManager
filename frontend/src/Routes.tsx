import type { RouteObject } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"

const routes: RouteObject[] = [
  {
    path: "/",
    // if user is authenticated, he/she should view Home page, else they should see login page
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]

export default routes
