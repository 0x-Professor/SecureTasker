"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import TaskManager from "@/components/task-manager"
import DashboardHeader from "@/components/dashboard-header"
import { isDemoMode } from "@/lib/supabase"
import { getDemoSession } from "@/lib/demo-auth"
import { AnimatedBackground } from "@/components/animated-background"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      console.log("=== DASHBOARD AUTH CHECK ===")
      console.log("Demo mode:", isDemoMode())
      console.log("Environment:", process.env.NODE_ENV)
      console.log("Hostname:", typeof window !== "undefined" ? window.location.hostname : "server")

      // ALWAYS use demo mode for now
      console.log("🔒 CHECKING DEMO SESSION")

      // Check for demo session
      const demoSession = getDemoSession()
      console.log("Demo session:", demoSession)

      if (!demoSession) {
        console.log("❌ No demo session found, redirecting to login")
        // Use window.location for hard redirect
        window.location.href = "/auth/login"
        return
      }

      console.log("✅ Demo session found, user authenticated")
      setUser(demoSession)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="text-cyan-300 text-xl font-orbitron tracking-wider">INITIALIZING SECURE DASHBOARD...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <DashboardHeader user={user} />
        <main className="container mx-auto px-4 py-8">
          <TaskManager />
        </main>
      </div>
    </div>
  )
}
