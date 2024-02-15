import { Checkbox } from "@/components/ui/checkbox"
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion"
import { Link } from "react-router-dom"
import axiosInstance from "@/lib/utils/api"
import { toast } from "sonner"
import { getToken } from "@/lib/helpers/localStorage"
import { useEffect, useState } from "react"

export default function TaskList() {
  const [tasks, setTasks] = useState<any>([])

  useEffect(() => {
    axiosInstance
      .get("/tasks/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setTasks(
          res.data.map((task: any) => ({
            ...task,
            dueDate: new Date(task?.due_date).toLocaleDateString(),
            isCompleted: task?.is_completed,
            estCompletion: task?.est_completion,
          }))
        )
      })
  }, [])

  function handleDeleteTask(id: string) {
    axiosInstance
      .delete(`/tasks/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        console.log(res)
        toast.success("Task deleted successfully")
        setTasks(
          (prevTasks: any) =>
            prevTasks?.filter((task: any) => task?.id !== id) || []
        )
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Error deleting task")
      })
  }

  return (
    <div className="max-w-md w-full mx-auto grid gap-4">
      <Accordion type="single" collapsible>
        {tasks.map((task: any) => (
          <AccordionItem key={task.id} value={task.id}>
            <AccordionTrigger
              style={{
                textDecoration: "none",
                color: task.completed ? "gray" : "black",
              }}
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={task.id}
                  onChange={undefined}
                  checked={task.completed}
                />
                <span className="font-medium">{task.title}</span>
              </div>
              <div className="ml-auto mx-2 flex space-x-2">
                <Link to={`/edit-task/${task.id}`}>
                  <PencilIcon className="w-4 h-4 text-blue-500 cursor-pointer" />
                </Link>

                <button onClick={() => handleDeleteTask(task.id)}>
                  <TrashIcon className="w-4 h-4 text-red-500 cursor-pointer" />
                </button>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <p className="text-sm">{task.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due by {task.dueDate}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function PencilIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
