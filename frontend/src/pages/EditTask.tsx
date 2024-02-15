import EditTaskForm from "@/components/EditTaskForm"
import Layout from "@/components/Layout/Layout"
import { useParams } from "react-router-dom"

const EditTask = () => {
  const params = useParams()
  const taskId = params?.id
  console.log("taskId:", taskId)

  return (
    <Layout>
      <div>
        <h1 className="text-center text-2xl font-bold my-2">Edit Task</h1>

        <EditTaskForm taskId={taskId} />
      </div>
    </Layout>
  )
}

export default EditTask
