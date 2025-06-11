"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Shield, LogOut, User } from "lucide-react"
import { createSupabaseClient, isDemoMode } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/auth-helpers-nextjs"

interface DashboardHeaderProps {
  user: SupabaseUser | null
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const [demoUser, setDemoUser] = useState<any>(null)

  useEffect(() => {
    if (isDemoMode()) {
      // Check for demo user in localStorage
      const storedDemoUser = localStorage.getItem("demo_user")
      if (storedDemoUser) {
        setDemoUser(JSON.parse(storedDemoUser))
      } else {
        // Redirect to login if no demo user
        router.push("/auth/login")
      }
    }
  }, [router])

  const handleLogout = async () => {
    if (isDemoMode()) {
      localStorage.removeItem("demo_user")
      router.push("/")
      return
    }

    try {
      const supabase = createSupabaseClient()
      await supabase.auth.signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/")
    }
  }

  const currentUser = isDemoMode() ? demoUser : user

  if (!currentUser) {
    return null
  }

  const userInitials = isDemoMode()
    ? demoUser?.name
        ?.split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase() || "DU"
    : user?.user_metadata?.full_name
        ?.split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase() ||
      user?.email?.[0]?.toUpperCase() ||
      "U"

  const userName = isDemoMode() ? demoUser?.name || "Demo User" : user?.user_metadata?.full_name || "User"
  const userEmail = isDemoMode() ? demoUser?.email || "demo@securetasker.com" : user?.email || ""

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                SecureTasker {isDemoMode() && <span className="text-sm text-orange-600">(Demo)</span>}
              </h1>
              <p className="text-sm text-gray-500">Secure Task Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
