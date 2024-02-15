import AddTaskForm from "@/components/AddTaskForm"
import Layout from "@/components/Layout/Layout"
import { Button } from "@/components/ui/button"
import { MoveLeftIcon } from "lucide-react"
import { Link } from "react-router-dom"

const AddTask = () => {
  return (
    <Layout>
      <div className="flex justify-between">
        <Link to={"/"}>
          <Button
            className="bg-transparent text-gray-600 hover:bg-transparent    "
            size={"icon"}
          >
            <MoveLeftIcon />
          </Button>
        </Link>
        <h1 className="mx-auto text-2xl font-bold my-2">Add Task</h1>
      </div>
      <AddTaskForm />
    </Layout>
  )
}

export default AddTask
