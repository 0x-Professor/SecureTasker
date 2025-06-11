"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Shield, LogOut, User, Settings } from "lucide-react"
import { isDemoMode, createSupabaseClient } from "@/lib/supabase"
import { logoutDemoUser } from "@/lib/demo-auth"

interface DashboardHeaderProps {
  user: any
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    console.log("Logging out...")

    if (isDemoMode()) {
      logoutDemoUser()
      console.log("Demo user logged out")
      router.push("/")
      return
    }

    try {
      console.log("Logging out from Supabase")
      const supabase = createSupabaseClient()
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error("Logout error:", error)
      }

      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/")
    }
  }

  if (!user) {
    return null
  }

  const userInitials =
    user.name
      ?.split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase() ||
    user.email?.[0]?.toUpperCase() ||
    "U"

  const userName = user.name || "User"
  const userEmail = user.email || ""

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-md opacity-50"></div>
              <div className="relative p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                <Shield className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-orbitron tracking-wider">
                CYBERVAULT {isDemoMode() && <span className="text-lg text-orange-400">[DEMO]</span>}
              </h1>
              <p className="text-slate-400 text-sm tracking-wide">QUANTUM-SECURED PLATFORM</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{userName}</p>
              <p className="text-xs text-slate-400">{userEmail}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0 hover:bg-slate-700/50">
                  <Avatar className="h-12 w-12 border-2 border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 font-bold text-lg">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-900/95 backdrop-blur-xl border-slate-700/50" align="end">
                <DropdownMenuItem className="text-slate-200 hover:bg-slate-800/50 focus:bg-slate-800/50">
                  <User className="mr-2 h-4 w-4 text-cyan-400" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-200 hover:bg-slate-800/50 focus:bg-slate-800/50">
                  <Settings className="mr-2 h-4 w-4 text-cyan-400" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Secure Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
