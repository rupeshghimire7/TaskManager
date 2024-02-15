import { useEffect, useState } from "react"
import { getToken } from "@/lib/helpers/localStorage"
import { toast } from "sonner"
import axiosInstance from "@/lib/utils/api"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Label } from "./ui/label"

const AddTaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    estCompletion: 1,
    importance: 1,
    complexity: 1,
    category: "",
  })

  const [categories, setCategories] = useState([])

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

  function onAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    axiosInstance
      .post(
        "/tasks/create/",
        {
          title: task.title,
          description: task.description,
          due_date: task.dueDate,
          est_completion: task.estCompletion,
          importance: task.importance,
          complexity: task.complexity,
          category: task.category,
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
        toast.success("Task added successfully")
        setTask({
          title: "",
          description: "",
          dueDate: "",
          estCompletion: 1,
          importance: 1,
          complexity: 1,
          category: "",
        })
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Error adding task")
      })
      .finally(() => {})
  }

  return (
    <form
      onSubmit={onAddTask}
      className="max-w-xl mx-auto p-4 bg-white rounded-md "
    >
      <div className="grid gird-cols-1 md:grid-cols-2 items-start gap-6">
        <div>
          <Label htmlFor="title">Task</Label>
          <Input
            type="text"
            id="title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={task.category}
            onValueChange={(e: any) =>
              setTask({ ...task, category: e.target.value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            type="date"
            id="dueDate"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>
        <div>
          <Label>Estimated Completion (in days [1-30])</Label>
          <Input
            type="number"
            id="estCompletion"
            value={task.estCompletion}
            onChange={(e) =>
              setTask({ ...task, estCompletion: parseInt(e.target.value) })
            }
            min={1}
            max={30}
          />
        </div>
        <div>
          <Label htmlFor="importance">Importance [1-10]</Label>
          <Input
            type="number"
            id="importance"
            value={task.importance}
            onChange={(e) =>
              setTask({ ...task, importance: parseInt(e.target.value) })
            }
            min={1}
            max={10}
          />
        </div>
        <div>
          <Label htmlFor="complexity">Complexity [1-10]</Label>
          <Input
            type="number"
            id="complexity"
            value={task.complexity}
            onChange={(e) =>
              setTask({ ...task, complexity: parseInt(e.target.value) })
            }
            min={1}
            max={10}
          />
        </div>
        <div className="col-start-1 col-end-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
      </div>
      <Button type="submit" className="mt-4 mb-2 bg-green-600 float-right">
        Create Task
      </Button>
    </form>
  )
}

export default AddTaskForm
