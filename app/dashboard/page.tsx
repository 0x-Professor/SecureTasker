"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckSquare, Shield, TrendingUp, Activity, Clock, Users, Database, Zap, Eye } from "lucide-react"
import { SecurityBadge } from "@/components/security-badge"
import Link from "next/link"

export default function DashboardOverview() {
  const stats = [
    { label: "Total Tasks", value: "24", change: "+12%", icon: CheckSquare, color: "text-blue-400" },
    { label: "Security Score", value: "94%", change: "+5%", icon: Shield, color: "text-green-400" },
    { label: "Active Sessions", value: "3", change: "0%", icon: Users, color: "text-purple-400" },
    { label: "System Uptime", value: "99.9%", change: "+0.1%", icon: Activity, color: "text-cyan-400" },
  ]

  const recentActivity = [
    { action: "Task completed", item: "Security audit review", time: "2 minutes ago", type: "success" },
    { action: "Security scan", item: "Input validation check", time: "15 minutes ago", type: "info" },
    { action: "New task created", item: "Update firewall rules", time: "1 hour ago", type: "default" },
    { action: "Login detected", item: "New session from Chrome", time: "2 hours ago", type: "warning" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold text-white font-orbitron mb-2">MISSION CONTROL</h1>
        <p className="text-slate-400 mb-6">Welcome to your quantum-secured command center</p>

        {/* Security Status Bar */}
        <div className="flex gap-3 flex-wrap mb-8">
          <SecurityBadge
            type="validation"
            status="active"
            label="INPUT VALIDATION"
            description="Zod schema validation protecting all endpoints"
          />
          <SecurityBadge
            type="xss"
            status="active"
            label="XSS SHIELD"
            description="Content Security Policy preventing malicious scripts"
          />
          <SecurityBadge
            type="auth"
            status="active"
            label="AUTH FORTRESS"
            description="Military-grade authentication system active"
          />
          <SecurityBadge
            type="encryption"
            status="active"
            label="QUANTUM ENCRYPTION"
            description="End-to-end encryption for all sensitive data"
          />
          <SecurityBadge
            type="monitoring"
            status="active"
            label="THREAT MONITOR"
            description="Real-time security monitoring and alerting"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-green-400 text-xs font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-slate-800/50 border border-slate-700/50`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-400">Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <Link href="/dashboard/tasks" className="w-full">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Manage Tasks
                </Button>
              </Link>
              <Link href="/dashboard/security" className="w-full">
                <Button className="w-full justify-start bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/analytics" className="w-full">
                <Button className="w-full justify-start bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
              <Link href="/dashboard/reports" className="w-full">
                <Button className="w-full justify-start bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30">
                  <Database className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-slate-400">Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-400"
                        : activity.type === "warning"
                          ? "bg-yellow-400"
                          : activity.type === "info"
                            ? "bg-blue-400"
                            : "bg-slate-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-slate-400 text-sm">{activity.item}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-400" />
            System Status Monitor
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time monitoring of critical system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "API Gateway", status: "Operational", uptime: "99.9%" },
              { name: "Database", status: "Operational", uptime: "100%" },
              { name: "Authentication", status: "Operational", uptime: "99.8%" },
              { name: "Security Scanner", status: "Operational", uptime: "99.7%" },
            ].map((service, index) => (
              <div key={service.name} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{service.name}</h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{service.status}</Badge>
                </div>
                <p className="text-slate-400 text-sm">Uptime: {service.uptime}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
