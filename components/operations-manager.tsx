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
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Shield,
  Activity,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  Trash2,
  Edit,
  Search,
  Target,
  Zap,
  Bug,
  FileText,
  Monitor,
} from "lucide-react"
import { createSupabaseClient, isDemoMode } from "@/lib/supabase"

// Operation validation schema
const operationSchema = z.object({
  title: z.string().min(1, "Operation title is required").max(150, "Title must be less than 150 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  priority: z.enum(["critical", "high", "medium", "low"]),
  status: z.enum(["pending", "active", "monitoring", "completed", "failed"]),
  operation_type: z.enum([
    "security_audit",
    "threat_analysis",
    "vulnerability_scan",
    "incident_response",
    "compliance_check",
    "system_monitoring",
  ]),
  risk_level: z.enum(["minimal", "low", "medium", "high", "critical"]),
  assigned_agent: z.string().max(100, "Agent name must be less than 100 characters").optional(),
  estimated_duration: z
    .number()
    .min(1, "Duration must be at least 1 minute")
    .max(10080, "Duration cannot exceed 1 week")
    .optional(),
  completion_percentage: z.number().min(0).max(100).optional(),
})

interface Operation {
  id: string
  title: string
  description: string | null
  priority: "critical" | "high" | "medium" | "low"
  status: "pending" | "active" | "monitoring" | "completed" | "failed"
  operation_type:
    | "security_audit"
    | "threat_analysis"
    | "vulnerability_scan"
    | "incident_response"
    | "compliance_check"
    | "system_monitoring"
  risk_level: "minimal" | "low" | "medium" | "high" | "critical"
  assigned_agent: string | null
  estimated_duration: number
  completion_percentage: number
  created_at: string
  updated_at: string
  user_id?: string
}

export default function OperationsManager() {
  const [operations, setOperations] = useState<Operation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    status: "pending" as const,
    operation_type: "security_audit" as const,
    risk_level: "medium" as const,
    assigned_agent: "",
    estimated_duration: 60,
    completion_percentage: 0,
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const router = useRouter()

  useEffect(() => {
    console.log("OperationsManager: Initializing...")
    if (isDemoMode()) {
      console.log("OperationsManager: Using demo mode")
      fetchDemoOperations()
    } else {
      console.log("OperationsManager: Using Supabase mode")
      fetchOperations()
    }
  }, [router])

  const fetchDemoOperations = () => {
    try {
      console.log("OperationsManager: Fetching demo operations...")
      const storedOperations = localStorage.getItem("demo_operations")
      if (storedOperations) {
        const parsedOperations = JSON.parse(storedOperations)
        console.log("OperationsManager: Found stored operations:", parsedOperations)
        setOperations(parsedOperations)
      } else {
        console.log("OperationsManager: No stored operations, creating sample operations")
        // Initialize with sample security operations
        const sampleOperations: Operation[] = [
          {
            id: "1",
            title: "Quantum Encryption Audit",
            description: "Comprehensive audit of quantum encryption protocols and implementation security.",
            priority: "critical",
            status: "active",
            operation_type: "security_audit",
            risk_level: "high",
            assigned_agent: "Agent Alpha-7",
            estimated_duration: 240,
            completion_percentage: 65,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Threat Vector Analysis",
            description: "Deep analysis of potential attack vectors targeting the CyberVault infrastructure.",
            priority: "high",
            status: "monitoring",
            operation_type: "threat_analysis",
            risk_level: "critical",
            assigned_agent: "Agent Beta-3",
            estimated_duration: 180,
            completion_percentage: 85,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "3",
            title: "Vulnerability Scan - Network Perimeter",
            description: "Automated vulnerability scanning of network perimeter defenses and entry points.",
            priority: "medium",
            status: "pending",
            operation_type: "vulnerability_scan",
            risk_level: "medium",
            assigned_agent: "Agent Gamma-1",
            estimated_duration: 120,
            completion_percentage: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "4",
            title: "Compliance Check - ISO 27001",
            description: "Comprehensive compliance verification against ISO 27001 security standards.",
            priority: "high",
            status: "completed",
            operation_type: "compliance_check",
            risk_level: "low",
            assigned_agent: "Agent Delta-5",
            estimated_duration: 300,
            completion_percentage: 100,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]
        setOperations(sampleOperations)
        localStorage.setItem("demo_operations", JSON.stringify(sampleOperations))
        console.log("OperationsManager: Sample operations created and stored")
      }
    } catch (error) {
      console.error("OperationsManager: Error loading demo operations:", error)
      setError("Failed to load demo operations")
    } finally {
      setLoading(false)
      console.log("OperationsManager: Demo operations loaded successfully")
    }
  }

  const fetchOperations = async () => {
    try {
      const supabase = createSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data, error } = await supabase
        .from("operations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setOperations(data || [])
    } catch (error) {
      setError("Failed to fetch operations")
      console.error("Error fetching operations:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveDemoOperations = (updatedOperations: Operation[]) => {
    localStorage.setItem("demo_operations", JSON.stringify(updatedOperations))
    setOperations(updatedOperations)
  }

  const validateInput = (field: string, value: string | number) => {
    try {
      if (field === "title") {
        operationSchema.shape.title.parse(value)
      } else if (field === "description") {
        operationSchema.shape.description.parse(value)
      } else if (field === "assigned_agent") {
        operationSchema.shape.assigned_agent.parse(value)
      } else if (field === "estimated_duration") {
        operationSchema.shape.estimated_duration.parse(Number(value))
      } else if (field === "completion_percentage") {
        operationSchema.shape.completion_percentage.parse(Number(value))
      }
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateInput(field, value)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      operation_type: "security_audit",
      risk_level: "medium",
      assigned_agent: "",
      estimated_duration: 60,
      completion_percentage: 0,
    })
    setValidationErrors({})
    setShowAddForm(false)
    setEditingOperation(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const validatedData = operationSchema.parse({
        ...formData,
        assigned_agent: formData.assigned_agent || undefined,
        description: formData.description || undefined,
      })

      if (isDemoMode()) {
        const currentOperations = [...operations]

        if (editingOperation) {
          const operationIndex = currentOperations.findIndex((op) => op.id === editingOperation.id)
          if (operationIndex !== -1) {
            currentOperations[operationIndex] = {
              ...editingOperation,
              ...validatedData,
              assigned_agent: validatedData.assigned_agent || null,
              description: validatedData.description || null,
              updated_at: new Date().toISOString(),
            }
          }
        } else {
          const newOperation: Operation = {
            id: Date.now().toString(),
            ...validatedData,
            description: validatedData.description || null,
            assigned_agent: validatedData.assigned_agent || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
          currentOperations.unshift(newOperation)
        }

        saveDemoOperations(currentOperations)
        resetForm()
        return
      }

      const supabase = createSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      if (editingOperation) {
        const { error } = await supabase
          .from("operations")
          .update({
            ...validatedData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingOperation.id)
          .eq("user_id", user.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("operations").insert([
          {
            ...validatedData,
            user_id: user.id,
          },
        ])

        if (error) throw error
      }

      await fetchOperations()
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
        setError("Failed to save operation")
        console.error("Error saving operation:", error)
      }
    }
  }

  const handleEdit = (operation: Operation) => {
    setEditingOperation(operation)
    setFormData({
      title: operation.title,
      description: operation.description || "",
      priority: operation.priority,
      status: operation.status,
      operation_type: operation.operation_type,
      risk_level: operation.risk_level,
      assigned_agent: operation.assigned_agent || "",
      estimated_duration: operation.estimated_duration,
      completion_percentage: operation.completion_percentage,
    })
    setShowAddForm(true)
  }

  const handleDelete = async (operationId: string) => {
    if (!confirm("Are you sure you want to delete this operation?")) return

    try {
      if (isDemoMode()) {
        const updatedOperations = operations.filter((op) => op.id !== operationId)
        saveDemoOperations(updatedOperations)
        return
      }

      const supabase = createSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { error } = await supabase.from("operations").delete().eq("id", operationId).eq("user_id", user.id)

      if (error) throw error
      await fetchOperations()
    } catch (error) {
      setError("Failed to delete operation")
      console.error("Error deleting operation:", error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
      case "low":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800"
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
      case "minimal":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "active":
        return <Activity className="h-4 w-4 text-blue-600" />
      case "monitoring":
        return <Eye className="h-4 w-4 text-purple-600" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  const getOperationTypeIcon = (type: string) => {
    switch (type) {
      case "security_audit":
        return <Shield className="h-4 w-4" />
      case "threat_analysis":
        return <Target className="h-4 w-4" />
      case "vulnerability_scan":
        return <Bug className="h-4 w-4" />
      case "incident_response":
        return <Zap className="h-4 w-4" />
      case "compliance_check":
        return <FileText className="h-4 w-4" />
      case "system_monitoring":
        return <Monitor className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  // Filter operations based on search and filters
  const filteredOperations = operations.filter((operation) => {
    const matchesSearch =
      operation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (operation.description && operation.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (operation.assigned_agent && operation.assigned_agent.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || operation.status === statusFilter
    const matchesPriority = priorityFilter === "all" || operation.priority === priorityFilter
    const matchesType = typeFilter === "all" || operation.operation_type === typeFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  console.log("OperationsManager: Rendering with loading:", loading, "operations:", operations.length)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading operations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Security Operations {isDemoMode() && <span className="text-lg text-orange-400">(Demo Mode)</span>}
          </h2>
          <p className="text-slate-400">
            {isDemoMode()
              ? "Demo security operations management with quantum-level validation"
              : "Quantum-secured operations management with CyberVault"}
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Operation
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search operations, agents, descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600/50 text-white"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600/50 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600/50 text-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600/50 text-white">
                  <SelectValue placeholder="Operation Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="security_audit">Security Audit</SelectItem>
                  <SelectItem value="threat_analysis">Threat Analysis</SelectItem>
                  <SelectItem value="vulnerability_scan">Vulnerability Scan</SelectItem>
                  <SelectItem value="incident_response">Incident Response</SelectItem>
                  <SelectItem value="compliance_check">Compliance Check</SelectItem>
                  <SelectItem value="system_monitoring">System Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
          <AlertDescription className="text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      {showAddForm && (
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">{editingOperation ? "Edit Operation" : "Create New Operation"}</CardTitle>
            <CardDescription className="text-slate-400">
              {editingOperation
                ? "Update operation parameters and status"
                : "Initialize a new security operation with quantum-level validation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-300">
                      Operation Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter operation title"
                      className={`bg-slate-800/50 border-slate-600/50 text-white ${validationErrors.title ? "border-red-500" : ""}`}
                    />
                    {validationErrors.title && <p className="text-sm text-red-400">{validationErrors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="operation_type" className="text-slate-300">
                      Operation Type
                    </Label>
                    <Select
                      value={formData.operation_type}
                      onValueChange={(value: any) => setFormData((prev) => ({ ...prev, operation_type: value }))}
                    >
                      <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="security_audit">Security Audit</SelectItem>
                        <SelectItem value="threat_analysis">Threat Analysis</SelectItem>
                        <SelectItem value="vulnerability_scan">Vulnerability Scan</SelectItem>
                        <SelectItem value="incident_response">Incident Response</SelectItem>
                        <SelectItem value="compliance_check">Compliance Check</SelectItem>
                        <SelectItem value="system_monitoring">System Monitoring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assigned_agent" className="text-slate-300">
                      Assigned Agent
                    </Label>
                    <Input
                      id="assigned_agent"
                      value={formData.assigned_agent}
                      onChange={(e) => handleInputChange("assigned_agent", e.target.value)}
                      placeholder="Agent designation (e.g., Agent Alpha-7)"
                      className={`bg-slate-800/50 border-slate-600/50 text-white ${validationErrors.assigned_agent ? "border-red-500" : ""}`}
                    />
                    {validationErrors.assigned_agent && (
                      <p className="text-sm text-red-400">{validationErrors.assigned_agent}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-slate-300">
                        Priority Level
                      </Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) => setFormData((prev) => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="risk_level" className="text-slate-300">
                        Risk Level
                      </Label>
                      <Select
                        value={formData.risk_level}
                        onValueChange={(value: any) => setFormData((prev) => ({ ...prev, risk_level: value }))}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-slate-300">
                      Operation Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="monitoring">Monitoring</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estimated_duration" className="text-slate-300">
                        Duration (minutes)
                      </Label>
                      <Input
                        id="estimated_duration"
                        type="number"
                        min="1"
                        max="10080"
                        value={formData.estimated_duration}
                        onChange={(e) => handleInputChange("estimated_duration", Number.parseInt(e.target.value) || 60)}
                        className={`bg-slate-800/50 border-slate-600/50 text-white ${validationErrors.estimated_duration ? "border-red-500" : ""}`}
                      />
                      {validationErrors.estimated_duration && (
                        <p className="text-sm text-red-400">{validationErrors.estimated_duration}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="completion_percentage" className="text-slate-300">
                        Progress (%)
                      </Label>
                      <Input
                        id="completion_percentage"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.completion_percentage}
                        onChange={(e) =>
                          handleInputChange("completion_percentage", Number.parseInt(e.target.value) || 0)
                        }
                        className={`bg-slate-800/50 border-slate-600/50 text-white ${validationErrors.completion_percentage ? "border-red-500" : ""}`}
                      />
                      {validationErrors.completion_percentage && (
                        <p className="text-sm text-red-400">{validationErrors.completion_percentage}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">
                  Operation Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Detailed description of the security operation objectives and scope"
                  rows={4}
                  className={`bg-slate-800/50 border-slate-600/50 text-white ${validationErrors.description ? "border-red-500" : ""}`}
                />
                {validationErrors.description && <p className="text-sm text-red-400">{validationErrors.description}</p>}
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                >
                  {editingOperation ? "Update Operation" : "Initialize Operation"}
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
        {filteredOperations.length === 0 ? (
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
            <CardContent className="py-12 text-center">
              <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                {searchTerm || statusFilter !== "all" || priorityFilter !== "all" || typeFilter !== "all"
                  ? "No matching operations"
                  : "No operations initialized"}
              </h3>
              <p className="text-slate-400 mb-4">
                {searchTerm || statusFilter !== "all" || priorityFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Initialize your first security operation to begin monitoring"}
              </p>
              {!searchTerm && statusFilter === "all" && priorityFilter === "all" && typeFilter === "all" && (
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Initialize First Operation
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredOperations.map((operation) => (
            <Card key={operation.id} className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getStatusIcon(operation.status)}
                      {getOperationTypeIcon(operation.operation_type)}
                      <h3 className="font-semibold text-white text-lg">{operation.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getPriorityColor(operation.priority)}>{operation.priority.toUpperCase()}</Badge>
                      <Badge className={getRiskLevelColor(operation.risk_level)}>
                        Risk: {operation.risk_level.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {operation.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {operation.operation_type.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                    {operation.description && (
                      <p className="text-slate-400 mb-3 leading-relaxed">{operation.description}</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                      {operation.assigned_agent && (
                        <div className="text-sm">
                          <span className="text-slate-500">Agent:</span>
                          <span className="text-cyan-400 ml-1 font-medium">{operation.assigned_agent}</span>
                        </div>
                      )}
                      <div className="text-sm">
                        <span className="text-slate-500">Duration:</span>
                        <span className="text-white ml-1">{operation.estimated_duration}m</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-slate-500">Progress:</span>
                        <span className="text-white ml-1">{operation.completion_percentage}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-slate-500">Created:</span>
                        <span className="text-white ml-1">{new Date(operation.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {operation.completion_percentage > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">Operation Progress</span>
                          <span className="text-white">{operation.completion_percentage}%</span>
                        </div>
                        <Progress value={operation.completion_percentage} className="h-2 bg-slate-700" />
                      </div>
                    )}
                    {operation.updated_at !== operation.created_at && (
                      <p className="text-sm text-slate-500">
                        Last updated: {new Date(operation.updated_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(operation)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(operation.id)}
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
