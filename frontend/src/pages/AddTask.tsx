import AddTaskForm from "@/components/AddTaskForm"
import Layout from "@/components/Layout/Layout"

const AddTask = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-center text-2xl font-bold my-2">Add Task</h1>

        <AddTaskForm />
      </div>
    </Layout>
  )
}

export default AddTask
