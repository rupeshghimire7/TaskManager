/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k7b89tv9FK7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[32px]" />
              <TableHead className="w-[150px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Due Date</TableHead>
              <TableHead className="w-[100px]">Due Time</TableHead>
              <TableHead className="w-[150px]">Est. Completion</TableHead>
              <TableHead>Importance</TableHead>
              <TableHead>Complexity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[100px]">Is Completed</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="space-y-1">
                <Checkbox id="select-1" />
              </TableCell>
              <TableCell className="font-medium">Design UI</TableCell>
              <TableCell>Sketch wireframes and mockups</TableCell>
              <TableCell className="font-medium">2023-07-10</TableCell>
              <TableCell className="font-medium">10:00 AM</TableCell>
              <TableCell className="font-medium">2h</TableCell>
              <TableCell className="font-medium">High</TableCell>
              <TableCell className="font-medium">Low</TableCell>
              <TableCell className="font-medium">Design</TableCell>
              <TableCell className="flex items-center">
                <CheckIcon className="h-4 w-4" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <FileEditIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="space-y-1">
                <Checkbox id="select-2" />
              </TableCell>
              <TableCell className="font-medium">Code Review</TableCell>
              <TableCell>Review pull requests and provide feedback</TableCell>
              <TableCell className="font-medium">2023-07-12</TableCell>
              <TableCell className="font-medium">3:00 PM</TableCell>
              <TableCell className="font-medium">1h</TableCell>
              <TableCell className="font-medium">Medium</TableCell>
              <TableCell className="font-medium">Medium</TableCell>
              <TableCell className="font-medium">Development</TableCell>
              <TableCell className="flex items-center">
                <CheckIcon className="h-4 w-4" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <FileEditIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="space-y-1">
                <Checkbox id="select-3" />
              </TableCell>
              <TableCell className="font-medium">Bug Fixes</TableCell>
              <TableCell>Address reported issues and bugs</TableCell>
              <TableCell className="font-medium">2023-07-15</TableCell>
              <TableCell className="font-medium">11:00 AM</TableCell>
              <TableCell className="font-medium">3h</TableCell>
              <TableCell className="font-medium">Low</TableCell>
              <TableCell className="font-medium">High</TableCell>
              <TableCell className="font-medium">Quality</TableCell>
              <TableCell className="flex items-center">
                <CheckIcon className="h-4 w-4" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <FileEditIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="space-y-1">
                <Checkbox id="select-4" />
              </TableCell>
              <TableCell className="font-medium">Client Meeting</TableCell>
              <TableCell>
                Discuss project requirements and deliverables
              </TableCell>
              <TableCell className="font-medium">2023-07-18</TableCell>
              <TableCell className="font-medium">2:00 PM</TableCell>
              <TableCell className="font-medium">1h</TableCell>
              <TableCell className="font-medium">High</TableCell>
              <TableCell className="font-medium">Low</TableCell>
              <TableCell className="font-medium">Meetings</TableCell>
              <TableCell className="flex items-center">
                <CheckIcon className="h-4 w-4" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <FileEditIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="space-y-1">
                <Checkbox id="select-5" />
              </TableCell>
              <TableCell className="font-medium">Task Assignment</TableCell>
              <TableCell>Assign tasks to team members</TableCell>
              <TableCell className="font-medium">2023-07-20</TableCell>
              <TableCell className="font-medium">10:00 AM</TableCell>
              <TableCell className="font-medium">1h</TableCell>
              <TableCell className="font-medium">Medium</TableCell>
              <TableCell className="font-medium">Medium</TableCell>
              <TableCell className="font-medium">Management</TableCell>
              <TableCell className="flex items-center">
                <CheckIcon className="h-4 w-4" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <FileEditIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button className="w-6 h-6" size="icon" variant="ghost">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function CheckIcon(props: any) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function FileEditIcon(props: any) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
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
