"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckSquare,
  Shield,
  TrendingUp,
  Activity,
  Clock,
  Users,
  Database,
  Zap,
  Eye,
  AlertTriangle,
} from "lucide-react"
import { SecurityBadge } from "@/components/security-badge"
import Link from "next/link"

export default function DashboardOverview() {
  const stats = [
    { label: "Active Operations", value: "24", change: "+12%", icon: CheckSquare, color: "text-blue-400" },
    { label: "Security Score", value: "94%", change: "+5%", icon: Shield, color: "text-green-400" },
    { label: "Active Sessions", value: "3", change: "0%", icon: Users, color: "text-purple-400" },
    { label: "System Uptime", value: "99.9%", change: "+0.1%", icon: Activity, color: "text-cyan-400" },
  ]

  const recentActivity = [
    { action: "Operation completed", item: "Security audit review", time: "2 minutes ago", type: "success" },
    { action: "Threat scan", item: "Input validation check", time: "15 minutes ago", type: "info" },
    { action: "New operation", item: "Update firewall rules", time: "1 hour ago", type: "default" },
    { action: "Access granted", item: "New session from Chrome", time: "2 hours ago", type: "warning" },
  ]

  const quickActions = [
    {
      href: "/dashboard/tasks",
      icon: CheckSquare,
      label: "Manage Operations",
      description: "View and manage active operations",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      text: "text-blue-300",
      hover: "hover:bg-blue-500/30",
    },
    {
      href: "/dashboard/security",
      icon: Shield,
      label: "Security Hub",
      description: "Monitor threats and vulnerabilities",
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
      text: "text-green-300",
      hover: "hover:bg-green-500/30",
    },
    {
      href: "/dashboard/analytics",
      icon: TrendingUp,
      label: "Intelligence Center",
      description: "View performance analytics",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      text: "text-purple-300",
      hover: "hover:bg-purple-500/30",
    },
    {
      href: "/dashboard/reports",
      icon: Database,
      label: "Generate Reports",
      description: "Create detailed reports",
      gradient: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/30",
      text: "text-orange-300",
      hover: "hover:bg-orange-500/30",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold text-white font-orbitron mb-2">COMMAND CENTER</h1>
        <p className="text-slate-400 mb-6">Welcome to CyberVault - Your quantum-secured command center</p>

        {/* Security Status Bar */}
        <div className="flex gap-3 flex-wrap mb-8">
          <SecurityBadge
            type="validation"
            status="active"
            label="INPUT VALIDATION"
            description="Quantum-level input validation protecting all endpoints"
          />
          <SecurityBadge
            type="xss"
            status="active"
            label="XSS SHIELD"
            description="Advanced Content Security Policy preventing malicious scripts"
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
            description="End-to-end quantum encryption for all sensitive data"
          />
          <SecurityBadge
            type="monitoring"
            status="active"
            label="THREAT MONITOR"
            description="Real-time AI-powered security monitoring"
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
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.div
                    key={action.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={action.href} className="block">
                      <Button
                        className={`w-full justify-start bg-gradient-to-r ${action.gradient} border ${action.border} ${action.text} ${action.hover} transition-all duration-200`}
                      >
                        <Icon className="mr-3 h-4 w-4" />
                        <div className="text-left">
                          <div className="font-medium">{action.label}</div>
                          <div className="text-xs opacity-70">{action.description}</div>
                        </div>
                      </Button>
                    </Link>
                  </motion.div>
                )
              })}
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
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-700/30 transition-colors"
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
              { name: "Quantum Gateway", status: "Operational", uptime: "99.9%", color: "green" },
              { name: "Neural Database", status: "Operational", uptime: "100%", color: "green" },
              { name: "Auth Matrix", status: "Operational", uptime: "99.8%", color: "green" },
              { name: "Threat Scanner", status: "Scanning", uptime: "99.7%", color: "blue" },
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-700/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{service.name}</h4>
                  <Badge
                    className={`${service.color === "green" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"}`}
                  >
                    {service.status}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm">Uptime: {service.uptime}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions - Integrated into the dashboard */}
      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            System Configuration
          </CardTitle>
          <CardDescription className="text-slate-400">
            Complete these steps to fully activate CyberVault
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-blue-400 font-bold text-sm">1</span>
              </div>
              <div>
                <p className="text-white font-medium">Configure Supabase Integration</p>
                <p className="text-slate-400 text-sm">Set up your Supabase project for data persistence</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <span className="text-green-400 font-bold text-sm">2</span>
              </div>
              <div>
                <p className="text-white font-medium">Initialize Database Schema</p>
                <p className="text-slate-400 text-sm">Run the SQL script to create the tasks table</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
