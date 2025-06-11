"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface CyberCardProps {
  feature: {
    title: string
    description: string
    icon: React.ReactNode
    color: string
    glowColor: string
  }
  index: number
}

export function CyberCard({ feature, index }: CyberCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      transition={{ duration: 0.3 }}
      className="group perspective-1000"
    >
      <Card className="h-full border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl rounded-2xl overflow-hidden relative transform-gpu">
        {/* Animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 border border-slate-700/50 group-hover:border-cyan-500/30 rounded-2xl transition-colors duration-500"></div>

        {/* Glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
        ></div>

        <CardContent className="p-8 relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20 border border-current/20 group-hover:shadow-lg ${feature.glowColor} transition-all duration-500`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`text-transparent bg-gradient-to-br ${feature.color} bg-clip-text`}>{feature.icon}</div>
            </motion.div>
            <h3 className="text-xl font-bold text-white font-orbitron tracking-wider group-hover:text-cyan-300 transition-colors duration-300">
              {feature.title}
            </h3>
          </div>

          <p className="text-slate-300 leading-relaxed flex-grow group-hover:text-slate-200 transition-colors duration-300">
            {feature.description}
          </p>

          {/* Scan line effect */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
