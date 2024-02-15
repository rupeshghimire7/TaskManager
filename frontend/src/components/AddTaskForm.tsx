import { Task } from "@/lib/types/task"
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
import { useEffect, useState } from "react"

const AddTaskForm = () => {
  const initialTask: Task = {
    title: "",
    description: "",
    dueDate: "",
    estCompletion: 1,
    importance: 1,
    complexity: 1,
    category: "",
    isCompleted: false,
    priority: 1,
  }

  const taskSchema = z.object({
    title: z.string().min(3, "Min 3").max(50, "Max 50"),
    description: z.string().max(300, "Max 300"),
    dueDate: z.string(),
    estCompletion: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1, "Min 1").max(30, "Max 30")
    ),
    importance: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1, "Min 1").max(10, "Max 10")
    ),
    complexity: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1, "Min 1").max(10, "Max 10")
    ),

    category: z.string(),
    isCompleted: z.boolean(),
    priority: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1, "Min 1").max(10, "Max 10")
    ),
  })

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialTask,
  })

  function onAddTask(values: z.infer<typeof taskSchema>) {
    console.log(values)

    axiosInstance
      .post(
        "/tasks/create/",
        {
          title: values.title,
          description: values.description,
          due_date: values.dueDate,
          est_completion: values.estCompletion,
          importance: values.importance,
          complexity: values.complexity,
          category: values.category,
          is_completed: values.isCompleted,
          priority: values.priority,
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
        form.reset()
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Error adding task")
      })
      .finally(() => { })
  }

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onAddTask)}
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
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
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
            name="estCompletion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Completion (in days [1-30])</FormLabel>
                <FormControl>
                  <Input
                    type={"number"}
                    {...field}
                    inputMode="numeric"
                    min={1}
                    max={30}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="importance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Importance [1-10]</FormLabel>
                <FormControl>
                  <Input
                    type={"number"}
                    {...field}
                    inputMode="numeric"
                    min={1}
                    max={10}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complexity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complexity [1-10]</FormLabel>
                <FormControl>
                  <Input
                    type={"number"}
                    {...field}
                    inputMode="numeric"
                    min={1}
                    max={10}
                  />
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
          Create Task
        </Button>
      </form>
    </Form>
  )
}

export default AddTaskForm
