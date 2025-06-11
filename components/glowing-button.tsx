"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowingButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "default" | "large"
  className?: string
}

export function GlowingButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
}: GlowingButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center font-semibold tracking-wider transition-all duration-300 rounded-xl overflow-hidden group"

  const sizeClasses = {
    default: "px-8 py-4 text-base",
    large: "px-12 py-6 text-lg",
  }

  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500",
    secondary: "bg-slate-900/50 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400",
  }

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

        {/* Ripple effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

        {/* Content */}
        <span className="relative z-10 flex items-center">{children}</span>
      </motion.div>
    </Link>
  )
}
