import type { RouteObject } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]

export default routes
