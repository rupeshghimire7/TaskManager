import { Task } from "@/lib/types/task"
import { useState } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const AddTaskForm = () => {
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

  const [task, setTask] = useState<Task>(initialTask)

  const taskSchema = z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(8).max(50),
  })

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialTask,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }))
  }

  function onAddTask(values: z.infer<typeof taskSchema>) {
    console.log(values)

    fetch("/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onAddTask)}
        className="flex flex-col items-center gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter task" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button>Add</Button>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Due Time:
          <input
            type="time"
            name="dueTime"
            value={task.dueTime}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Estimated Completion (in days):
          <input
            type="number"
            name="estCompletion"
            value={task.estCompletion}
            onChange={handleChange}
            min="1"
            max="30"
            required
          />
        </label>
        <br />
        <label>
          Importance:
          <input
            type="number"
            name="importance"
            value={task.importance}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </label>
        <br />
        <label>
          Complexity:
          <input
            type="number"
            name="complexity"
            value={task.complexity}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </label>
        <br />
        <label>
          Category:
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {/* Add your category options here */}
          </select>
        </label>
        <br />
        <label>
          Is Completed:
          <input
            type="checkbox"
            name="isCompleted"
            checked={task.isCompleted}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Priority:
          <input
            type="number"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </Form>
  )
}

export default AddTaskForm
