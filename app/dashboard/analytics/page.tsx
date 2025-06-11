"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Clock, CheckSquare, AlertTriangle, RefreshCw, Download } from "lucide-react"

interface AnalyticsData {
  tasksCompleted: number
  tasksInProgress: number
  tasksPending: number
  averageCompletionTime: number
  productivityScore: number
  weeklyTrend: number
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setData({
        tasksCompleted: 24,
        tasksInProgress: 8,
        tasksPending: 12,
        averageCompletionTime: 2.5,
        productivityScore: 87,
        weeklyTrend: 12,
      })
      setLoading(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white font-orbitron">ANALYTICS DASHBOARD</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-slate-700 rounded w-1/2 mb-2"></div>
                  <div className="h-2 bg-slate-700 rounded w-full"></div>
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
          <h1 className="text-3xl font-bold text-white font-orbitron">ANALYTICS DASHBOARD</h1>
          <p className="text-slate-400">Performance insights and productivity metrics</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={fetchAnalytics}
            disabled={loading}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {[
          { label: "7 Days", value: "7d" },
          { label: "30 Days", value: "30d" },
          { label: "90 Days", value: "90d" },
          { label: "1 Year", value: "1y" },
        ].map((range) => (
          <Button
            key={range.value}
            variant={timeRange === range.value ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range.value)}
            className={
              timeRange === range.value
                ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                : "border-slate-600 text-slate-300 hover:bg-slate-800"
            }
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Tasks Completed</p>
                  <p className="text-3xl font-bold text-white mt-1">{data?.tasksCompleted}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span className="text-green-400 text-xs font-medium">+{data?.weeklyTrend}%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                  <CheckSquare className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold text-white mt-1">{data?.tasksInProgress}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3 text-blue-400" />
                    <span className="text-blue-400 text-xs font-medium">Active</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Pending Tasks</p>
                  <p className="text-3xl font-bold text-white mt-1">{data?.tasksPending}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <AlertTriangle className="h-3 w-3 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-medium">Waiting</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Productivity Score</p>
                  <p className="text-3xl font-bold text-white mt-1">{data?.productivityScore}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-purple-400" />
                    <span className="text-purple-400 text-xs font-medium">Excellent</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Task Completion Trends</CardTitle>
            <CardDescription className="text-slate-400">Daily task completion over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Chart visualization would be implemented here</p>
                <p className="text-sm">Using libraries like Recharts or Chart.js</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
            <CardDescription className="text-slate-400">Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Task Completion Rate</span>
                <span className="text-white">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Average Response Time</span>
                <span className="text-white">2.5 days</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Quality Score</span>
                <span className="text-white">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Team Collaboration</span>
                <span className="text-white">91%</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
