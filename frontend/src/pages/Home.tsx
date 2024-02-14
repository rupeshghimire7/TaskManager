import axiosInstance from "@/lib/utils/api"
import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    console.log("Home page")
    axiosInstance.get("/tasks/").then((res) => console.log(res.data))
  }, [])

  // const taskList = []

  return (
    <div>
      <div>Task add bar</div>
      <div>Task</div>
      <div>Tasks List</div>
    </div>
  )
}

export default Home
