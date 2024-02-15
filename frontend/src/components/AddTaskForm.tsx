import { Task } from "@/lib/types/task"
import { useState } from "react"
import * as z from "zod"
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem } from "./ui/select"
import { getToken } from "@/lib/helpers/localStorage"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"

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

  function onAddTask(values: z.infer<typeof taskSchema>) {
    console.log(values)

    fetch("/tasks/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        toast.success("Task added successfully")
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Error adding task")
      })
      .finally(() => {
        form.reset()
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onAddTask)}
        className="p-4 bg-white rounded-md shadow-md"
      >
        <div className="grid grid-cols-4 items-center gap-4">
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
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectContent>
                      <SelectItem value="_">Select a category</SelectItem>
                    </SelectContent>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
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
          <FormField
            control={form.control}
            name="estCompletion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Completion (in days)</FormLabel>
                <FormControl>
                  <Input type={"number"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="importance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Importance</FormLabel>
                <FormControl>
                  <Input type={"number"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complexity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complexity</FormLabel>
                <FormControl>
                  <Input type={"number"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Input type={"number"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Create Task</Button>
      </form>
    </Form>
  )
}

export default AddTaskForm
