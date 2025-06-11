"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Eye,
  Lock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Activity,
  RefreshCw,
  TrendingUp,
  Database,
  Globe,
  Server,
} from "lucide-react"
import { SecurityBadge } from "@/components/security-badge"

interface SecurityMetric {
  id: string
  name: string
  status: "active" | "warning" | "error"
  score: number
  description: string
  lastCheck: string
  icon: any
}

export default function SecurityPage() {
  const [metrics, setMetrics] = useState<SecurityMetric[]>([])
  const [overallScore, setOverallScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading security metrics
    setTimeout(() => {
      const securityMetrics: SecurityMetric[] = [
        {
          id: "input-validation",
          name: "Input Validation",
          status: "active",
          score: 98,
          description: "Zod schema validation active on all endpoints",
          lastCheck: new Date().toISOString(),
          icon: Shield,
        },
        {
          id: "xss-protection",
          name: "XSS Protection",
          status: "active",
          score: 95,
          description: "Content Security Policy and output encoding enabled",
          lastCheck: new Date().toISOString(),
          icon: Eye,
        },
        {
          id: "authentication",
          name: "Authentication",
          status: "active",
          score: 92,
          description: "Secure session management and password hashing",
          lastCheck: new Date().toISOString(),
          icon: Lock,
        },
        {
          id: "csrf-protection",
          name: "CSRF Protection",
          status: "warning",
          score: 85,
          description: "Token-based CSRF protection with minor configuration needed",
          lastCheck: new Date().toISOString(),
          icon: CheckCircle,
        },
        {
          id: "encryption",
          name: "Data Encryption",
          status: "active",
          score: 97,
          description: "End-to-end encryption for sensitive data",
          lastCheck: new Date().toISOString(),
          icon: Zap,
        },
        {
          id: "monitoring",
          name: "Security Monitoring",
          status: "active",
          score: 90,
          description: "Real-time threat detection and logging",
          lastCheck: new Date().toISOString(),
          icon: Activity,
        },
      ]

      setMetrics(securityMetrics)
      const avgScore = securityMetrics.reduce((sum, metric) => sum + metric.score, 0) / securityMetrics.length
      setOverallScore(Math.round(avgScore))
      setLoading(false)
    }, 1000)
  }, [])

  const runSecurityScan = () => {
    setLoading(true)
    // Simulate security scan
    setTimeout(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          lastCheck: new Date().toISOString(),
          score: Math.min(100, metric.score + Math.floor(Math.random() * 3)),
        })),
      )
      setLoading(false)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-orbitron">SECURITY DASHBOARD</h1>
            <p className="text-slate-400">Real-time security monitoring and threat analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/2"></div>
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
          <h1 className="text-3xl font-bold text-white font-orbitron">SECURITY DASHBOARD</h1>
          <p className="text-slate-400">Real-time security monitoring and threat analysis</p>
        </div>
        <Button
          onClick={runSecurityScan}
          disabled={loading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Run Security Scan
        </Button>
      </div>

      {/* Overall Security Score */}
      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-6 w-6 text-cyan-400" />
            Overall Security Score
          </CardTitle>
          <CardDescription className="text-slate-400">
            Comprehensive security assessment based on multiple factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-slate-700 flex items-center justify-center">
                <div
                  className={`text-2xl font-bold ${
                    overallScore >= 90 ? "text-green-400" : overallScore >= 70 ? "text-yellow-400" : "text-red-400"
                  }`}
                >
                  {overallScore}%
                </div>
              </div>
              <div
                className={`absolute inset-0 rounded-full border-4 border-transparent ${
                  overallScore >= 90
                    ? "border-t-green-400"
                    : overallScore >= 70
                      ? "border-t-yellow-400"
                      : "border-t-red-400"
                } animate-spin`}
                style={{ animationDuration: "3s" }}
              ></div>
            </div>
            <div className="flex-1">
              <Progress value={overallScore} className="h-3 mb-2" />
              <div className="flex gap-2 flex-wrap">
                <SecurityBadge
                  type="validation"
                  status="active"
                  label="INPUT SECURE"
                  description="All inputs are validated using Zod schemas"
                />
                <SecurityBadge
                  type="xss"
                  status="active"
                  label="XSS PROTECTED"
                  description="Content Security Policy prevents XSS attacks"
                />
                <SecurityBadge
                  type="auth"
                  status="active"
                  label="AUTH SECURE"
                  description="Strong authentication and session management"
                />
                <SecurityBadge
                  type="encryption"
                  status="active"
                  label="ENCRYPTED"
                  description="Data encrypted in transit and at rest"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg border ${
                          metric.status === "active"
                            ? "bg-green-500/20 border-green-500/30"
                            : metric.status === "warning"
                              ? "bg-yellow-500/20 border-yellow-500/30"
                              : "bg-red-500/20 border-red-500/30"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            metric.status === "active"
                              ? "text-green-400"
                              : metric.status === "warning"
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{metric.name}</CardTitle>
                        <Badge
                          className={`${
                            metric.status === "active"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : metric.status === "warning"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                          } text-xs`}
                        >
                          {metric.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          metric.score >= 90
                            ? "text-green-400"
                            : metric.score >= 70
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {metric.score}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-3">{metric.description}</p>
                  <Progress value={metric.score} className="h-2 mb-2" />
                  <p className="text-xs text-slate-500">Last checked: {new Date(metric.lastCheck).toLocaleString()}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Security Alerts */}
      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Security Alerts & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-yellow-500/30 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200">
              <strong>CSRF Protection:</strong> Consider implementing additional CSRF token validation for enhanced
              security.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-500/30 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">
              <strong>Input Validation:</strong> All user inputs are properly validated and sanitized.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-500/30 bg-blue-500/10">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Security Score Improved:</strong> Your security score has increased by 5% this week.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Infrastructure Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">Database Security</h3>
                <p className="text-sm text-slate-400">RLS Policies Active</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">SECURE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="font-semibold text-white">Network Security</h3>
                <p className="text-sm text-slate-400">HTTPS Enforced</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">SECURE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Server className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="font-semibold text-white">Server Security</h3>
                <p className="text-sm text-slate-400">Headers Configured</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">SECURE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
