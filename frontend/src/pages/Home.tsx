import axiosInstance from "@/lib/utils/api"
import { useEffect, useState } from "react"
import { Task } from "@/lib/types/task"
import { getToken } from "@/lib/helpers/localStorage"
import Layout from "@/components/Layout/Layout"

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

  return (

    <Layout >
      <div>
        <div>Task</div>
        <div>
          {taskList.map((task: Task) => (
            <div key={task?.title}>{task?.title}</div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home
