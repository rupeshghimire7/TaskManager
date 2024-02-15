export interface Task {
  title: string
  description?: string
  dueDate: string
  dueTime: string
  estCompletion: number
  importance: number
  complexity: number
  category: string
  isCompleted: boolean
  priority: number
}

export interface User {
  name: string
  email: string
  username: string
}
