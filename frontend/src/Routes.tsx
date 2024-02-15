import type { RouteObject } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AddTask from "./pages/AddTask"
import EditTask from "./pages/EditTask"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-task",
    element: <AddTask />,
  },
  {
    path: "/edit-task/:id",
    element: <EditTask />,
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
