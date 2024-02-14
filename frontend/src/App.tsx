import { useRoutes } from "react-router-dom"
import AuthProvider  from "./lib/context/authContext"
import routes from "./Routes"

function App() {
  const appContent = useRoutes(routes)
  return (
    <>
      <AuthProvider>
        {appContent}
      </AuthProvider>
    </>)
}

export default App
