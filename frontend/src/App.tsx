import { useRoutes } from "react-router-dom"
import routes from "./Routes"

function App() {
  const appContent = useRoutes(routes)
  return appContent
}

export default App
