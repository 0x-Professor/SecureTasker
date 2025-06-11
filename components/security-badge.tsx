"use client"

import { motion } from "framer-motion"
import { Shield, CheckCircle, AlertTriangle, Lock, Eye, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SecurityBadgeProps {
  type: "validation" | "xss" | "auth" | "csrf" | "encryption" | "monitoring"
  status: "active" | "warning" | "error"
  label: string
  description: string
}

const securityIcons = {
  validation: Shield,
  xss: Eye,
  auth: Lock,
  csrf: CheckCircle,
  encryption: Zap,
  monitoring: AlertTriangle,
}

const statusColors = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  error: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function SecurityBadge({ type, status, label, description }: SecurityBadgeProps) {
  const Icon = securityIcons[type]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2">
            <Badge className={`${statusColors[status]} px-3 py-1 font-semibold tracking-wide`}>
              <Icon className="h-3 w-3 mr-1" />
              {label}
            </Badge>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200">
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
