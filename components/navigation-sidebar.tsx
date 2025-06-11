"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  CheckSquare,
  Shield,
  Settings,
  BarChart3,
  Bell,
  FileText,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", description: "Main overview" },
  { href: "/dashboard/tasks", icon: CheckSquare, label: "Tasks", description: "Task management" },
  { href: "/dashboard/security", icon: Shield, label: "Security", description: "Security monitoring" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", description: "Performance metrics" },
  { href: "/dashboard/activity", icon: Activity, label: "Activity", description: "System activity logs" },
  { href: "/dashboard/notifications", icon: Bell, label: "Notifications", description: "Alerts & updates" },
  { href: "/dashboard/reports", icon: FileText, label: "Reports", description: "Generate reports" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings", description: "User preferences" },
]

interface NavigationSidebarProps {
  user: any
}

export function NavigationSidebar({ user }: NavigationSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
              <Shield className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-bold text-white font-orbitron text-sm">SECURETASKER</h2>
              <p className="text-xs text-slate-400">QUANTUM SECURED</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white hover:bg-slate-800/50"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50",
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "text-cyan-400")} />
                {!collapsed && (
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs opacity-70">{item.description}</p>
                  </div>
                )}
                {isActive && !collapsed && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                <span className="text-cyan-300 font-bold text-sm">{user?.name?.[0]?.toUpperCase() || "U"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  )
}
