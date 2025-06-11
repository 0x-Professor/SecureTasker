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
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const checkAuth = () => {
      console.log("=== DASHBOARD AUTH CHECK ===")
      console.log("Demo mode:", isDemoMode())

      // ALWAYS use demo mode for now
      console.log("🔒 CHECKING DEMO SESSION")

      // Check for demo session
      const demoSession = getDemoSession()
      console.log("Demo session:", demoSession)

      if (!demoSession) {
        console.log("❌ No demo session found, redirecting to login")
        router.push("/auth/login")
        return
      }

      console.log("✅ Demo session found, user authenticated")
      console.log("Setting user state:", demoSession)

      // Update states in the correct order
      setUser(demoSession)
      setLoading(false)

      console.log("Dashboard should now render")
    }

    checkAuth()
  }, [router, mounted])

  // Add logging for render states
  console.log("=== DASHBOARD RENDER ===")
  console.log("Mounted:", mounted)
  console.log("Loading:", loading)
  console.log("User:", user)

  // Don't render anything until mounted (prevents hydration issues)
  if (!mounted) {
    console.log("Not mounted yet, returning null")
    return null
  }

  if (loading) {
    console.log("Rendering loading state")
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

  if (!user) {
    console.log("No user found, redirecting to login")
    router.push("/auth/login")
    return (
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <p className="text-cyan-300 text-xl font-orbitron tracking-wider">REDIRECTING TO LOGIN...</p>
        </div>
      </div>
    )
  }

  console.log("✅ RENDERING FULL DASHBOARD with user:", user)
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <DashboardHeader user={user} />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            key="dashboard-content"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-slate-400">You're successfully logged into the secure dashboard.</p>
            </div>
            <TaskManager />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
