import EditTaskForm from "@/components/EditTaskForm"
import Layout from "@/components/Layout/Layout"
import { Button } from "@/components/ui/button"
import { MoveLeftIcon } from "lucide-react"
import { Link, useParams } from "react-router-dom"

const EditTask = () => {
  const { id = "" } = useParams<{ id: string }>()
  const taskId: string = id
  console.log("taskId:", taskId)

  return (
    <Layout>
      <div className="flex justify-center">
        <Link to={"/"}>
          <Button
            className="bg-transparent text-gray-600 hover:bg-transparent    "
            size={"icon"}
          >
            <MoveLeftIcon />
          </Button>
        </Link>
        <h1 className="text-center text-2xl font-bold my-2">Edit Task</h1>

        <EditTaskForm taskId={taskId} />
      </div>
    </Layout>
  )
}

export default EditTask
