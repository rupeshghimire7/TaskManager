import EditTaskForm from "@/components/EditTaskForm"
import Layout from "@/components/Layout/Layout"

const EditTask = () => {
  const taskId = window.location.pathname.split("/")[2]
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
