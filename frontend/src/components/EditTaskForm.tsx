import { Task } from "@/lib/types/task"
import { useState, useEffect } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
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

interface EditTaskFormProps {
  taskId: string
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ taskId }) => {
  const [task, setTask] = useState<Task | null>(null)

  const initialTask: Task = {
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    estCompletion: 1,
    importance: 1,
    complexity: 1,
    category: "",
    isCompleted: false,
    priority: 1,
  }

  const taskSchema = z.object({
    title: z.string().min(3).max(50),
    description: z.string().max(300),
    dueDate: z.string(),
    dueTime: z.string(),
    estCompletion: z.number().min(1).max(30),
    importance: z.number().min(1).max(10),
    complexity: z.number().min(1).max(10),
    category: z.string(),
    isCompleted: z.boolean(),
    priority: z.number().min(1).max(10),
  })

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialTask,
  })

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
        form.reset(data)
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Error fetching task")
      })
  }, [taskId])

  function onEditTask(values: z.infer<typeof taskSchema>) {
    console.log(values)

    axiosInstance
      .put(
        `/tasks/update/${taskId}/`,
        {
          title: values.title,
          description: values.description,
          due_date: values.dueDate,
          due_time: values.dueTime,
          category: values.category,
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
        form.reset()
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onEditTask)}
        className="p-4 bg-white rounded-md "
      >
        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Input type={"text"} placeholder={"Enter task"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type={"date"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Time</FormLabel>
                <FormControl>
                  <Input type={"time"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="col-start-1 col-end-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder={"Enter description"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="mt-4 mb-2 bg-green-600 float-right">
          Update Task
        </Button>
      </form>
    </Form>
  )
}

export default EditTaskForm
