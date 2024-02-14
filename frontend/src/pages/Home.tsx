import axiosInstance from "@/lib/utils/api"
import { useEffect, useState } from "react"

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  created_at: string
  updated_at: string
}

const Home = () => {
  const [taskList, setTaskList] = useState<[]>([])

  useEffect(() => {
    axiosInstance.get("/tasks/").then((res) => setTaskList(res.data))
  }, [])

  // const taskList = []

  return (
    <div>
      <div>Task add bar</div>
      <div>Task</div>
      <div>
        {taskList.map((task: Task) => (
          <div key={task?.id}>{task?.title}</div>
        ))}
      </div>
    </div>
  )
}

export default Home
