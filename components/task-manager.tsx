"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, CheckCircle, Clock, AlertCircle, Trash2, Edit } from "lucide-react"
import { createSupabaseClient, isDemoMode } from "@/lib/supabase"

// Task validation schema
const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "in_progress", "completed"]),
})

interface Task {
  id: string
  title: string
  description: string | null
  priority: "low" | "medium" | "high"
  status: "pending" | "in_progress" | "completed"
  created_at: string
  updated_at: string
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    status: "pending" as const,
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const router = useRouter()

  useEffect(() => {
    console.log("TaskManager: Initializing...")
    if (isDemoMode()) {
      console.log("TaskManager: Using demo mode")
      fetchDemoTasks()
    } else {
      console.log("TaskManager: Using Supabase mode")
      fetchTasks()
    }
  }, [router])

  const fetchDemoTasks = () => {
    try {
      console.log("TaskManager: Fetching demo tasks...")
      const storedTasks = localStorage.getItem("demo_tasks")
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks)
        console.log("TaskManager: Found stored tasks:", parsedTasks)
        setTasks(parsedTasks)
      } else {
        console.log("TaskManager: No stored tasks, creating sample tasks")
        // Initialize with sample tasks
        const sampleTasks: Task[] = [
          {
            id: "1",
            title: "Welcome to SecureTasker Demo",
            description: "This is a sample task to demonstrate the secure task management features.",
            priority: "high",
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Explore Security Features",
            description: "Check out the input validation, XSS protection, and other security measures.",
            priority: "medium",
            status: "in_progress",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]
        setTasks(sampleTasks)
        localStorage.setItem("demo_tasks", JSON.stringify(sampleTasks))
        console.log("TaskManager: Sample tasks created and stored")
      }
    } catch (error) {
      console.error("TaskManager: Error loading demo tasks:", error)
      setError("Failed to load demo tasks")
    } finally {
      setLoading(false)
      console.log("TaskManager: Demo tasks loaded successfully")
    }
  }

  const fetchTasks = async () => {
    try {
      const supabase = createSupabaseClient()
      const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      setError("Failed to fetch tasks")
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveDemoTasks = (updatedTasks: Task[]) => {
    localStorage.setItem("demo_tasks", JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }

  const validateInput = (field: string, value: string) => {
    try {
      if (field === "title") {
        taskSchema.shape.title.parse(value)
      } else if (field === "description") {
        taskSchema.shape.description.parse(value)
      }
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateInput(field, value)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
    })
    setValidationErrors({})
    setShowAddForm(false)
    setEditingTask(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const validatedData = taskSchema.parse(formData)

      if (isDemoMode()) {
        const currentTasks = [...tasks]

        if (editingTask) {
          const taskIndex = currentTasks.findIndex((t) => t.id === editingTask.id)
          if (taskIndex !== -1) {
            currentTasks[taskIndex] = {
              ...editingTask,
              ...validatedData,
              updated_at: new Date().toISOString(),
            }
          }
        } else {
          const newTask: Task = {
            id: Date.now().toString(),
            ...validatedData,
            description: validatedData.description || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
          currentTasks.unshift(newTask)
        }

        saveDemoTasks(currentTasks)
        resetForm()
        return
      }

      const supabase = createSupabaseClient()

      if (editingTask) {
        const { error } = await supabase
          .from("tasks")
          .update({
            ...validatedData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingTask.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("tasks").insert([validatedData])

        if (error) throw error
      }

      await fetchTasks()
      resetForm()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        setValidationErrors(errors)
      } else {
        setError("Failed to save task")
        console.error("Error saving task:", error)
      }
    }
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
    })
    setShowAddForm(true)
  }

  const handleDelete = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return

    try {
      if (isDemoMode()) {
        const updatedTasks = tasks.filter((t) => t.id !== taskId)
        saveDemoTasks(updatedTasks)
        return
      }

      const supabase = createSupabaseClient()
      const { error } = await supabase.from("tasks").delete().eq("id", taskId)

      if (error) throw error
      await fetchTasks()
    } catch (error) {
      setError("Failed to delete task")
      console.error("Error deleting task:", error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  console.log("TaskManager: Rendering with loading:", loading, "tasks:", tasks.length)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            My Tasks {isDemoMode() && <span className="text-lg text-orange-400">(Demo Mode)</span>}
          </h2>
          <p className="text-slate-400">
            {isDemoMode() ? "Manage your demo tasks with full security validation" : "Manage your daily tasks securely"}
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
          <AlertDescription className="text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      {showAddForm && (
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">{editingTask ? "Edit Task" : "Add New Task"}</CardTitle>
            <CardDescription className="text-slate-400">
              {editingTask ? "Update your task details" : "Create a new task with secure validation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter task title"
                    className={`bg-slate-800/50 border-slate-600/50 text-white ${validationErrors.title ? "border-red-500" : ""}`}
                  />
                  {validationErrors.title && <p className="text-sm text-red-400">{validationErrors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-slate-300">
                    Priority
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setFormData((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-slate-300">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "pending" | "in_progress" | "completed") =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter task description (optional)"
                  rows={3}
                  className={`bg-slate-800/50 border-slate-600/50 text-white ${validationErrors.description ? "border-red-500" : ""}`}
                />
                {validationErrors.description && <p className="text-sm text-red-400">{validationErrors.description}</p>}
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                >
                  {editingTask ? "Update Task" : "Add Task"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No tasks yet</h3>
              <p className="text-slate-400 mb-4">Get started by creating your first task</p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Task
              </Button>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(task.status)}
                      <h3 className="font-semibold text-white">{task.title}</h3>
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {task.status.replace("_", " ")}
                      </Badge>
                    </div>
                    {task.description && <p className="text-slate-400 mb-3">{task.description}</p>}
                    <p className="text-sm text-slate-500">
                      Created: {new Date(task.created_at).toLocaleDateString()}
                      {task.updated_at !== task.created_at && (
                        <span> • Updated: {new Date(task.updated_at).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(task)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(task.id)}
                      className="border-red-600/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
