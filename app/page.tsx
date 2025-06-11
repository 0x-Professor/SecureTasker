"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, CheckSquare, Lock, Zap, GitBranch, Eye, Moon, Sun, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { AnimatedBackground } from "@/components/animated-background"
import { GlowingButton } from "@/components/glowing-button"
import { CyberCard } from "@/components/cyber-card"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const features = [
    {
      title: "INPUT VALIDATION",
      description:
        "Advanced Zod schemas with real-time validation to prevent injection attacks and ensure data integrity across all endpoints.",
      icon: <Shield className="h-8 w-8" />,
      color: "from-cyan-400 to-blue-500",
      glowColor: "shadow-cyan-500/50",
    },
    {
      title: "XSS PROTECTION",
      description:
        "Multi-layer Content Security Policy with output encoding to prevent cross-site scripting and malicious code execution.",
      icon: <Eye className="h-8 w-8" />,
      color: "from-purple-400 to-pink-500",
      glowColor: "shadow-purple-500/50",
    },
    {
      title: "SECURE AUTH",
      description:
        "Military-grade bcrypt hashing with JWT tokens, biometric support, and intelligent session management protocols.",
      icon: <Lock className="h-8 w-8" />,
      color: "from-red-400 to-orange-500",
      glowColor: "shadow-red-500/50",
    },
    {
      title: "OWASP COMPLIANCE",
      description:
        "Full implementation of OWASP Top 10 security practices with automated CSRF protection and secure configurations.",
      icon: <CheckSquare className="h-8 w-8" />,
      color: "from-green-400 to-emerald-500",
      glowColor: "shadow-green-500/50",
    },
    {
      title: "AI SECURITY SCAN",
      description:
        "Automated static analysis with machine learning threat detection and continuous security monitoring systems.",
      icon: <Zap className="h-8 w-8" />,
      color: "from-yellow-400 to-amber-500",
      glowColor: "shadow-yellow-500/50",
    },
    {
      title: "QUANTUM CI/CD",
      description:
        "Next-generation GitHub Actions with quantum-resistant encryption and automated deployment to secure cloud infrastructure.",
      icon: <GitBranch className="h-8 w-8" />,
      color: "from-indigo-400 to-violet-500",
      glowColor: "shadow-indigo-500/50",
    },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30">
                <Shield className="h-20 w-20 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 tracking-wider font-orbitron">
              SECURETASKER
            </h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <AnimatedBackground />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-cyan-500/30 bg-slate-900/50 backdrop-blur-md hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-cyan-400" />}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20 md:mb-32"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 backdrop-blur-md">
                <Shield className="h-24 w-24 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-8 tracking-wider font-orbitron"
          >
            SECURETASKER
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-4"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              QUANTUM-SECURED TASK MANAGEMENT
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Next-generation task management platform with military-grade security protocols, AI-powered threat
            detection, and quantum-resistant encryption infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <GlowingButton href="/auth/login" variant="primary">
              <Lock className="mr-3 h-5 w-5" />
              SECURE LOGIN
              <ArrowRight className="ml-3 h-5 w-5" />
            </GlowingButton>
            <GlowingButton href="/auth/register" variant="secondary">
              INITIALIZE ACCOUNT
            </GlowingButton>
          </motion.div>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 md:mb-32"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <CyberCard feature={feature} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Implementation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32"
        >
          <Card className="border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"></div>
            <div className="absolute inset-0 border border-cyan-500/20 rounded-3xl"></div>
            <CardContent className="p-10 md:p-16 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4 font-orbitron tracking-wider">
                  NEURAL ARCHITECTURE
                </h2>
                <p className="text-slate-300 text-xl">Advanced security infrastructure powered by quantum computing</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h4 className="text-2xl font-semibold text-cyan-400 mb-6 font-orbitron tracking-wide">
                    FRONTEND SHIELD
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Quantum Content Security Policy",
                      "Neural XSS Protection Matrix",
                      "Biometric CSRF Validation",
                      "AI-Powered Input Sanitization",
                      "Encrypted Cookie Protocols",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center text-slate-200 group"
                      >
                        <div className="mr-4 h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.7)] transition-all duration-300"></div>
                        <span className="group-hover:text-cyan-300 transition-colors duration-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-8">
                  <h4 className="text-2xl font-semibold text-purple-400 mb-6 font-orbitron tracking-wide">
                    BACKEND FORTRESS
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Quantum Password Encryption",
                      "Neural JWT Token Management",
                      "AI Rate Limiting Systems",
                      "Zero-Trust SQL Protection",
                      "Autonomous Security Headers",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center text-slate-200 group"
                      >
                        <div className="mr-4 h-3 w-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.7)] transition-all duration-300"></div>
                        <span className="group-hover:text-purple-300 transition-colors duration-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
          <Card className="border-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 border border-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-3xl"></div>
            <CardContent className="p-12 md:p-20 relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-8 font-orbitron tracking-wider">
                INITIALIZE SECURITY
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join the next generation of secure task management. Experience quantum-level protection for your digital
                workspace.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <GlowingButton href="/auth/register" variant="primary" size="large">
                  DEPLOY SECURITY PROTOCOL
                </GlowingButton>
                <GlowingButton href="/auth/login" variant="secondary" size="large">
                  ACCESS TERMINAL
                </GlowingButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20 pt-12 border-t border-slate-800"
        >
          <p className="text-slate-400 mb-2">SECURETASKER © 2024 - QUANTUM-SECURED ENTERPRISE PLATFORM</p>
          <p className="text-slate-500 text-sm">
            POWERED BY NEXT.JS QUANTUM CORE • SUPABASE NEURAL NETWORK • AI SECURITY MATRIX
          </p>
        </motion.div>
      </div>
    </div>
  )
}
