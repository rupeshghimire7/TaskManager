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
      <div className="flex justify-between">
        <Link to={"/"}>
          <Button
            className="bg-transparent text-gray-600 hover:bg-transparent    "
            size={"icon"}
          >
            <MoveLeftIcon />
          </Button>
        </Link>
        <h1 className="mx-auto text-2xl font-bold my-2">Edit Task</h1>
      </div>

      <EditTaskForm taskId={taskId} />
    </Layout>
  )
}

export default EditTask
