"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import TaskManager from "@/components/task-manager"
import DashboardHeader from "@/components/dashboard-header"
import { createSupabaseClient, isDemoMode } from "@/lib/supabase"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        // Check for demo user
        const demoUser = localStorage.getItem("demo_user")
        if (!demoUser) {
          router.push("/auth/login")
          return
        }
        setUser(JSON.parse(demoUser))
        setLoading(false)
        return
      }

      try {
        const supabase = createSupabaseClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/auth/login")
          return
        }

        setUser(session.user)
      } catch (error) {
        console.error("Auth error:", error)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      <main className="container mx-auto px-4 py-8">
        <TaskManager />
      </main>
    </div>
  )
}
