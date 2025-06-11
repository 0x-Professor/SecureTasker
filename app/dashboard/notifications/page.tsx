"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield,
  Clock,
  Trash2,
  Settings,
  BookMarkedIcon as MarkAsRead,
  Filter,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success" | "security"
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    securityAlerts: true,
    taskReminders: true,
  })

  useEffect(() => {
    // Simulate loading notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Security Scan Completed",
        message: "Your weekly security scan has completed successfully. No threats detected.",
        type: "security",
        timestamp: new Date().toISOString(),
        read: false,
        priority: "medium",
      },
      {
        id: "2",
        title: "Task Deadline Approaching",
        message: "Task 'Update firewall rules' is due in 2 hours.",
        type: "warning",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        read: false,
        priority: "high",
      },
      {
        id: "3",
        title: "New Team Member Added",
        message: "Sarah Johnson has been added to your team.",
        type: "info",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        read: true,
        priority: "low",
      },
      {
        id: "4",
        title: "Failed Login Attempt",
        message: "Suspicious login attempt detected from IP 203.0.113.42",
        type: "error",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        read: false,
        priority: "high",
      },
      {
        id: "5",
        title: "Task Completed",
        message: "You have successfully completed 'Database backup verification'.",
        type: "success",
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        read: true,
        priority: "low",
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "security":
        return <Shield className="h-5 w-5 text-purple-400" />
      default:
        return <Info className="h-5 w-5 text-blue-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "security":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "unread") return !notif.read
    return notif.type === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-orbitron">NOTIFICATIONS</h1>
          <p className="text-slate-400">Stay updated with important alerts and system events ({unreadCount} unread)</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={markAllAsRead}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <MarkAsRead className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Notification Settings */}
      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription className="text-slate-400">Configure your notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: "emailNotifications", label: "Email Notifications" },
              { key: "pushNotifications", label: "Push Notifications" },
              { key: "securityAlerts", label: "Security Alerts" },
              { key: "taskReminders", label: "Task Reminders" },
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between">
                <span className="text-slate-300">{setting.label}</span>
                <Switch
                  checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, [setting.key]: checked })
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: "All", value: "all" },
          { label: "Unread", value: "unread" },
          { label: "Security", value: "security" },
          { label: "Warnings", value: "warning" },
          { label: "Info", value: "info" },
        ].map((filterOption) => (
          <Button
            key={filterOption.value}
            variant={filter === filterOption.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterOption.value)}
            className={
              filter === filterOption.value
                ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                : "border-slate-600 text-slate-300 hover:bg-slate-800"
            }
          >
            <Filter className="mr-1 h-3 w-3" />
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className={`border-slate-700/50 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300 ${
                !notification.read ? "border-l-4 border-l-cyan-400" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold ${notification.read ? "text-slate-300" : "text-white"}`}>
                          {notification.title}
                        </h3>
                        <p className={`text-sm ${notification.read ? "text-slate-500" : "text-slate-400"}`}>
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(notification.type)}>{notification.type.toUpperCase()}</Badge>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-3 w-3" />
                        {new Date(notification.timestamp).toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-slate-400 hover:text-white"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardContent className="py-12 text-center">
            <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No notifications found</h3>
            <p className="text-slate-400">You're all caught up! Check back later for new updates.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
