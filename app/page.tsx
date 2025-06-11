"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, CheckSquare, Lock, Zap, GitBranch, Eye, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const features = [
    {
      title: "Input Validation",
      description:
        "Comprehensive client and server-side validation using Zod schemas to prevent injection attacks and ensure data integrity.",
      icon: <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "XSS Protection",
      description:
        "Output encoding and Content Security Policy headers to prevent cross-site scripting attacks and malicious code execution.",
      icon: <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      color: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Secure Authentication",
      description:
        "Bcrypt password hashing, JWT tokens, session management, and automatic logout with configurable timeouts.",
      icon: <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />,
      color: "bg-red-50 dark:bg-red-950",
    },
    {
      title: "OWASP Compliance",
      description:
        "Implementation of OWASP Top 10 security practices including CSRF protection, security headers, and secure configurations.",
      icon: <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />,
      color: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Security Scanning",
      description:
        "Automated static analysis with Bandit, dynamic testing capabilities, and continuous security monitoring in CI/CD pipeline.",
      icon: <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
      color: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      title: "CI/CD Integration",
      description:
        "GitHub Actions workflow with automated testing, security scans, code quality checks, and deployment automation.",
      icon: <GitBranch className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      color: "bg-indigo-50 dark:bg-indigo-950",
    },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <div className="flex justify-center mb-8">
              <div className="p-5 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-lg">
                <Shield className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">SecureTasker</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              A secure web-based task management application demonstrating OWASP best practices, automated security
              testing, and CI/CD integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-lg">
                <Link href="/auth/login">
                  <Lock className="mr-2 h-5 w-5" />
                  Login
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl shadow-md">
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="p-5 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 rounded-full shadow-lg">
              <Shield className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            SecureTasker
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            A secure web-based task management application demonstrating OWASP best practices, automated security
            testing, and CI/CD integration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/auth/login">
                <Lock className="mr-2 h-5 w-5" />
                Login
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800"
            >
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${feature.color}`}>{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Implementation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Technical Implementation</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Built with modern security-first architecture and best practices
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Frontend Security</h4>
                  <ul className="space-y-3">
                    {[
                      "Content Security Policy (CSP)",
                      "XSS Protection Headers",
                      "CSRF Token Validation",
                      "Input Sanitization",
                      "Secure Cookie Configuration",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-700 dark:text-gray-200"
                      >
                        <div className="mr-3 h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Backend Security</h4>
                  <ul className="space-y-3">
                    {[
                      "Password Hashing (bcrypt)",
                      "JWT Token Management",
                      "Rate Limiting",
                      "SQL Injection Prevention",
                      "Security Headers Middleware",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-700 dark:text-gray-200"
                      >
                        <div className="mr-3 h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                        {item}
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-8 md:p-16 rounded-3xl shadow-lg mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to secure your tasks?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join SecureTasker today and experience enterprise-grade security for your personal task management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Link href="/auth/register">Get Started Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-500 dark:text-gray-400">
            SecureTasker demonstrates enterprise-level security practices for modern web applications.
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Built with Next.js, Supabase, and automated security testing.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
