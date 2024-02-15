import { useState, useEffect } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { getToken } from "@/lib/helpers/localStorage"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"
import axiosInstance from "@/lib/utils/api"
import { Label } from "./ui/label"
import { useNavigate } from "react-router-dom"

interface EditTaskFormProps {
  taskId: string
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ taskId }) => {
  const [task, setTask] = useState<any | null>(null)

  const initialTask: any = {
    title: "",
    description: "",
    dueDate: "",
    category: "",
    estCompletion: "",
    importance: "",
    complexity: "",
    isCompleted: false,
  }
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState(initialTask)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get("/tasks/category/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setCategories(data?.categories)
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Error fetching categories")
      })
  }, [])

  useEffect(() => {
    axiosInstance
      .get(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setTask(data)
        setFormData({
          title: data.title,
          description: data.description,
          dueDate: data.due_date,
          category: data.category,
          estCompletion: data.est_completion,
          importance: data.importance,
          complexity: data.complexity,
          isCompleted: data.is_completed,
        })
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Error fetching task")
      })
  }, [taskId])

  function onEditTask(e: any) {
    e.preventDefault()
    axiosInstance
      .put(
        `/tasks/update/${taskId}/`,
        {
          title: formData.title,
          description: formData.description,
          due_date: formData.dueDate,
          category: formData.category,
          est_completion: formData.estCompletion,
          importance: formData.importance,
          complexity: formData.complexity,
          is_completed: formData.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        console.log(data)
        toast.success("Task updated successfully")
        setFormData(initialTask)
        navigate(`/`)
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Error updating task")
      })
      .finally(() => {})
  }

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <form onSubmit={onEditTask} className="p-4 bg-white rounded-md ">
        <div className="grid grid-cols-1 max-w-xl mx-auto gap-4">
          <>
            <Label>Task</Label>
            <div>
              <Input
                type="text"
                placeholder="Enter task"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
          </>

          <div>
            <Label>Estimated Completion</Label>
            <div>
              <Input
                type="number"
                placeholder="Enter days [1-30]"
                value={formData.estCompletion}
                onChange={(e) =>
                  setFormData({ ...formData, estCompletion: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label>Importance</Label>
            <div>
              <Input
                type="number"
                placeholder="Enter  [1-10]"
                value={formData.importance}
                onChange={(e) =>
                  setFormData({ ...formData, importance: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <Label>Complexity</Label>
            <div>
              <Input
                type="number"
                placeholder="Enter  [1-10]"
                value={formData.complexity}
                onChange={(e) =>
                  setFormData({ ...formData, complexity: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              className="block w-full px-2 bg-transparent py-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
              name="category"
              value={formData.category}
              onChange={(e: any) =>
                setTask({ ...formData, category: e.target.value })
              }
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Due Date</Label>
            <div>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <div>
              <Textarea
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <Button type="submit" className="mt-4 mb-2 bg-green-600 float-right">
            Update Task
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditTaskForm
