"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, Search, Filter, Download, Clock, User, Shield, CheckSquare, Eye, Lock } from "lucide-react"

interface ActivityLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  details: string
  type: "auth" | "task" | "security" | "system"
  severity: "low" | "medium" | "high"
  ip?: string
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  useEffect(() => {
    fetchActivityLogs()
  }, [])

  const fetchActivityLogs = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockActivities: ActivityLog[] = [
        {
          id: "1",
          timestamp: new Date().toISOString(),
          user: "john.doe@company.com",
          action: "LOGIN_SUCCESS",
          resource: "Authentication System",
          details: "User successfully logged in from Chrome browser",
          type: "auth",
          severity: "low",
          ip: "192.168.1.100",
        },
        {
          id: "2",
          timestamp: new Date(Date.now() - 300000).toISOString(),
          user: "jane.smith@company.com",
          action: "TASK_CREATED",
          resource: "Task Management",
          details: "Created new task: 'Update security protocols'",
          type: "task",
          severity: "low",
        },
        {
          id: "3",
          timestamp: new Date(Date.now() - 600000).toISOString(),
          user: "system",
          action: "SECURITY_SCAN",
          resource: "Security Monitor",
          details: "Automated security scan completed - no threats detected",
          type: "security",
          severity: "low",
        },
        {
          id: "4",
          timestamp: new Date(Date.now() - 900000).toISOString(),
          user: "admin@company.com",
          action: "FAILED_LOGIN",
          resource: "Authentication System",
          details: "Failed login attempt detected from suspicious IP",
          type: "auth",
          severity: "high",
          ip: "203.0.113.42",
        },
        {
          id: "5",
          timestamp: new Date(Date.now() - 1200000).toISOString(),
          user: "bob.wilson@company.com",
          action: "TASK_COMPLETED",
          resource: "Task Management",
          details: "Completed task: 'Database backup verification'",
          type: "task",
          severity: "low",
        },
        {
          id: "6",
          timestamp: new Date(Date.now() - 1500000).toISOString(),
          user: "system",
          action: "SYSTEM_UPDATE",
          resource: "System Core",
          details: "Security patches applied successfully",
          type: "system",
          severity: "medium",
        },
      ]
      setActivities(mockActivities)
      setLoading(false)
    }, 1000)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "auth":
        return <Lock className="h-4 w-4" />
      case "task":
        return <CheckSquare className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "system":
        return <Activity className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "auth":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "task":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "security":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "system":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || activity.type === filterType

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white font-orbitron">ACTIVITY MONITOR</h1>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-orbitron">ACTIVITY MONITOR</h1>
          <p className="text-slate-400">Real-time system activity and audit logs</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600/50 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { label: "All", value: "all" },
                { label: "Auth", value: "auth" },
                { label: "Tasks", value: "task" },
                { label: "Security", value: "security" },
                { label: "System", value: "system" },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterType === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(filter.value)}
                  className={
                    filterType === filter.value
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }
                >
                  <Filter className="mr-1 h-3 w-3" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: activities.length, type: "all" },
          { label: "Auth Events", value: activities.filter((a) => a.type === "auth").length, type: "auth" },
          { label: "Security Events", value: activities.filter((a) => a.type === "security").length, type: "security" },
          { label: "High Severity", value: activities.filter((a) => a.severity === "high").length, type: "high" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Log */}
      <div className="space-y-4">
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getTypeColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{activity.action.replace(/_/g, " ")}</h3>
                        <p className="text-slate-400 text-sm">{activity.resource}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(activity.severity)}>{activity.severity.toUpperCase()}</Badge>
                        <Badge className={getTypeColor(activity.type)}>{activity.type.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-3">{activity.details}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {activity.user}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                      {activity.ip && (
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {activity.ip}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardContent className="py-12 text-center">
            <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No activities found</h3>
            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
