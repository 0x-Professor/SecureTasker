"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  Shield,
  Users,
  Clock,
  TrendingUp,
  CheckSquare,
  AlertTriangle,
} from "lucide-react"

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: "security" | "productivity" | "compliance" | "analytics"
  icon: any
  estimatedTime: string
  lastGenerated?: string
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [generating, setGenerating] = useState<string | null>(null)

  const reportTemplates: ReportTemplate[] = [
    {
      id: "security-audit",
      name: "Security Audit Report",
      description:
        "Comprehensive security assessment including vulnerabilities, compliance status, and recommendations",
      type: "security",
      icon: Shield,
      estimatedTime: "2-3 minutes",
      lastGenerated: "2024-01-15",
    },
    {
      id: "productivity-analysis",
      name: "Productivity Analysis",
      description: "Task completion rates, team performance metrics, and productivity trends over time",
      type: "productivity",
      icon: TrendingUp,
      estimatedTime: "1-2 minutes",
      lastGenerated: "2024-01-14",
    },
    {
      id: "compliance-report",
      name: "Compliance Report",
      description: "OWASP compliance status, security standards adherence, and regulatory requirements",
      type: "compliance",
      icon: CheckSquare,
      estimatedTime: "3-4 minutes",
      lastGenerated: "2024-01-10",
    },
    {
      id: "user-activity",
      name: "User Activity Report",
      description: "User engagement metrics, login patterns, and system usage analytics",
      type: "analytics",
      icon: Users,
      estimatedTime: "1-2 minutes",
      lastGenerated: "2024-01-13",
    },
    {
      id: "task-analytics",
      name: "Task Analytics Report",
      description: "Task distribution, completion times, priority analysis, and workflow efficiency",
      type: "analytics",
      icon: BarChart3,
      estimatedTime: "2-3 minutes",
      lastGenerated: "2024-01-12",
    },
    {
      id: "incident-summary",
      name: "Security Incident Summary",
      description: "Security events, threat detection results, and incident response metrics",
      type: "security",
      icon: AlertTriangle,
      estimatedTime: "1-2 minutes",
      lastGenerated: "2024-01-11",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "security":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "productivity":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "compliance":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "analytics":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const generateReport = async (reportId: string) => {
    setGenerating(reportId)
    // Simulate report generation
    setTimeout(() => {
      setGenerating(null)
      // In a real app, this would trigger a download or show the report
      alert(`Report generated successfully! Download would start automatically.`)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-orbitron">REPORTS CENTER</h1>
          <p className="text-slate-400">Generate comprehensive reports and analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600/50 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Reports Generated", value: "47", icon: FileText, color: "text-blue-400" },
          { label: "Security Scans", value: "12", icon: Shield, color: "text-red-400" },
          { label: "Compliance Score", value: "94%", icon: CheckSquare, color: "text-green-400" },
          { label: "Avg Generation Time", value: "2.3m", icon: Clock, color: "text-purple-400" },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTemplates.map((template, index) => {
          const Icon = template.icon
          const isGenerating = generating === template.id

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${getTypeColor(template.type)}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getTypeColor(template.type)}>{template.type.toUpperCase()}</Badge>
                          <span className="text-slate-500 text-xs">Est. {template.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 mb-4">{template.description}</CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      {template.lastGenerated && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Last: {new Date(template.lastGenerated).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => generateReport(template.id)}
                      disabled={isGenerating}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Generate Report
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Reports */}
      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Recent Reports</CardTitle>
          <CardDescription className="text-slate-400">Recently generated reports and downloads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Security Audit Report - January 2024",
                type: "security",
                generated: "2024-01-15 14:30",
                size: "2.4 MB",
              },
              {
                name: "Productivity Analysis - Q4 2023",
                type: "productivity",
                generated: "2024-01-14 09:15",
                size: "1.8 MB",
              },
              {
                name: "User Activity Report - December 2023",
                type: "analytics",
                generated: "2024-01-13 16:45",
                size: "3.1 MB",
              },
            ].map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-white">{report.name}</p>
                    <p className="text-sm text-slate-400">
                      Generated: {report.generated} • Size: {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(report.type)}>{report.type.toUpperCase()}</Badge>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
