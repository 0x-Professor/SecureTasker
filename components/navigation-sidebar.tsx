"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Shield,
  BarChart3,
  Activity,
  Settings,
  Bell,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface NavigationSidebarProps {
  user: any
}

export function NavigationSidebar({ user }: NavigationSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    {
      title: "Command Center",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "System overview",
    },
    {
      title: "Operations",
      href: "/dashboard/operations",
      icon: Shield,
      description: "Security operations",
      badge: "4",
    },
    {
      title: "Security Monitor",
      href: "/dashboard/security",
      icon: Eye,
      description: "Threat analysis",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      description: "Performance metrics",
    },
    {
      title: "Activity Log",
      href: "/dashboard/activity",
      icon: Activity,
      description: "System events",
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
      description: "Generate reports",
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      description: "Alert center",
      badge: "3",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      description: "System config",
    },
  ]

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-cyan-500/20 z-40 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-sm opacity-50"></div>
                <div className="relative p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-orbitron tracking-wide">CYBERVAULT</h2>
                <p className="text-xs text-slate-400 tracking-wider">NEURAL INTERFACE</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link href={item.href}>
                <div
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"></div>
                  )}

                  <div
                    className={`relative ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400"} transition-colors`}
                  >
                    <Icon className="h-5 w-5" />
                    {isActive && <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur-sm"></div>}
                  </div>

                  {!collapsed && (
                    <>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${isActive ? "text-white" : "group-hover:text-white"} transition-colors`}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                          {item.description}
                        </p>
                      </div>

                      {item.badge && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">{item.badge}</Badge>
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <p className="text-white font-medium whitespace-nowrap">{item.title}</p>
                      <p className="text-slate-400 text-xs whitespace-nowrap">{item.description}</p>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
              <span className="text-cyan-300 font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{user?.name || "Agent"}</p>
              <p className="text-slate-400 text-xs truncate">{user?.email || "Classified"}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
