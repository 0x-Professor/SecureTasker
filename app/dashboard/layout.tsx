"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import { getDemoSession } from "@/lib/demo-auth"
import { AnimatedBackground } from "@/components/animated-background"
import { createSupabaseClient } from "@/lib/supabase"
import { isDemoMode } from "@/lib/utils"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const checkAuth = async () => {
      console.log("=== DASHBOARD LAYOUT AUTH CHECK ===")
      console.log("Demo mode:", isDemoMode())

      if (isDemoMode()) {
        // Check demo session
        const demoSession = getDemoSession()
        console.log("Demo session:", demoSession)

        if (!demoSession) {
          console.log("❌ No demo session found, redirecting to login")
          router.push("/auth/login")
          return
        }

        console.log("✅ Demo session found, user authenticated")
        setUser(demoSession)
        setLoading(false)
      } else {
        // Check Supabase session
        try {
          const supabase = createSupabaseClient()
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession()

          if (error) {
            console.error("Supabase session error:", error)
            router.push("/auth/login")
            return
          }

          if (!session) {
            console.log("❌ No Supabase session found, redirecting to login")
            router.push("/auth/login")
            return
          }

          console.log("✅ Supabase session found, user authenticated")
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email,
          })
          setLoading(false)
        } catch (error) {
          console.error("Auth check error:", error)
          router.push("/auth/login")
        }
      }
    }

    checkAuth()
  }, [router, mounted])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="text-cyan-300 text-xl font-orbitron tracking-wider">INITIALIZING SECURE DASHBOARD...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/auth/login")
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex">
        <NavigationSidebar user={user} />
        <div className="flex-1 ml-64">
          <DashboardHeader user={user} />
          <main className="container mx-auto px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
