import axiosInstance from "@/lib/utils/api"
import { useEffect, useState } from "react"
import { getToken } from "@/lib/helpers/localStorage"
import Layout from "@/components/Layout/Layout"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Home = () => {
  const [taskList, setTaskList] = useState<[]>([])

  useEffect(() => {
    axiosInstance
      .get("/tasks/", {
        headers: {
          Authorizaion: `Bearer ${getToken()}`,
        },
      })
      .then((res) => setTaskList(res.data))
  }, [])

  // const taskList = [

  return (
    <Layout>
      <div className="space-y-2 py-4 ml-6">
        <Link to="/add-task">
          <Button variant="destructive">Add task</Button>
        </Link>
        <div>
          {taskList.length ? (
            <div>
              {taskList.map((task: any) => (
                <div key={task?.title}>{task?.title}</div>
              ))}
            </div>
          ) : (
            "No task added"
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Home
