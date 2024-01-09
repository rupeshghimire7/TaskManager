import type { RouteObject } from "react-router-dom"
import LoginPage from "./pages/LoginPage"

const routes: RouteObject[] = [
	{
		path: "/",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <LoginPage />,
	},
]

export default routes
