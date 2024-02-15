import Layout from "@/components/Layout/Layout"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import TaskList from "@/components/TaskList/TaskList"

const Home = () => {
  return (
    <Layout>
      <div className="space-y-2 py-4 ml-6">
        <Link to="/add-task">
          <Button className="bg-green-600 hover:bg-green-800">Add task</Button>
        </Link>
        <div>
          <TaskList />
        </div>
      </div>
    </Layout>
  )
}

export default Home
