"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, CheckCircle, AlertTriangle, UserPlus, ArrowLeft } from "lucide-react"
import { isDemoMode } from "@/lib/supabase"
import { registerDemoUser, demoUserExists, getDemoSession } from "@/lib/demo-auth"
import { AnimatedBackground } from "@/components/animated-background"

// Strong password validation schema
const registerSchema = z
  .object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const checkSession = () => {
      const session = getDemoSession()
      if (session) {
        console.log("User already logged in, redirecting to dashboard")
        window.location.href = "/dashboard"
      }
    }

    checkSession()
  }, [router])

  const validateInput = (field: string, value: string) => {
    try {
      if (field === "email") {
        registerSchema.shape.email.parse(value)
      } else if (field === "password") {
        registerSchema.shape.password.parse(value)
      } else if (field === "fullName") {
        registerSchema.shape.fullName.parse(value)
      }
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateInput(field, value)
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate all inputs
      const validatedData = registerSchema.parse(formData)

      console.log("=== REGISTRATION ATTEMPT ===")
      console.log("Email:", validatedData.email)
      console.log("Demo mode check:", isDemoMode())
      console.log("Environment:", process.env.NODE_ENV)
      console.log("Hostname:", typeof window !== "undefined" ? window.location.hostname : "server")

      // ALWAYS use demo mode for now - no Supabase calls
      console.log("🔒 USING DEMO REGISTRATION SYSTEM")

      // Check if user already exists
      if (demoUserExists(validatedData.email)) {
        setError("An account with this email already exists. Please try logging in instead.")
        return
      }

      // Register the demo user
      const success = registerDemoUser(validatedData.email, validatedData.password, validatedData.fullName)

      if (success) {
        console.log("✅ Demo registration successful")
        setSuccess(true)
        setTimeout(() => {
          // Use window.location for hard redirect
          window.location.href = "/auth/login"
        }, 2000)
      } else {
        console.log("❌ Demo registration failed")
        setError("Failed to create account. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        setValidationErrors(errors)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <Card className="border-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
              <div className="absolute inset-0 border border-green-500/30 rounded-3xl"></div>

              <CardHeader className="text-center relative z-10 pt-12 pb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                      <CheckCircle className="h-16 w-16 text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.7)]" />
                    </div>
                  </div>
                </motion.div>

                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-orbitron tracking-wider">
                  ACCOUNT CREATED
                </CardTitle>
                <CardDescription className="text-slate-300 text-lg mt-4 leading-relaxed">
                  Your account has been successfully created! You can now login with your credentials.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="border-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden relative">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
            <div className="absolute inset-0 border border-purple-500/30 rounded-3xl"></div>

            <CardHeader className="text-center relative z-10 pt-8 pb-6">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
                    <Shield className="h-12 w-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]" />
                  </div>
                </div>
              </motion.div>

              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-orbitron tracking-wider">
                CREATE ACCOUNT
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg mt-2">
                Join the quantum-secured platform with enterprise-grade protection
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 px-8 pb-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Alert className="mb-6 border-orange-500/30 bg-orange-500/10">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <AlertDescription className="text-orange-200">
                    <strong>Demo Mode:</strong> Your account will be stored locally for testing
                  </AlertDescription>
                </Alert>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="fullName" className="text-purple-300 font-semibold tracking-wide">
                    FULL NAME
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className={`bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12 ${
                      validationErrors.fullName ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.fullName && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.fullName}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-purple-300 font-semibold tracking-wide">
                    EMAIL ADDRESS
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className={`bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12 ${
                      validationErrors.email ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.email}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-purple-300 font-semibold tracking-wide">
                    PASSWORD
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Create a strong password"
                      required
                      autoComplete="new-password"
                      className={`bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12 pr-12 ${
                        validationErrors.password ? "border-red-500" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-700/50 text-slate-400 hover:text-purple-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                              passwordStrength >= level
                                ? passwordStrength <= 2
                                  ? "bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"
                                  : passwordStrength <= 4
                                    ? "bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"
                                    : "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"
                                : "bg-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400">
                        Security Level: {passwordStrength <= 2 ? "Weak" : passwordStrength <= 4 ? "Medium" : "Strong"}
                      </p>
                    </div>
                  )}

                  {validationErrors.password && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.password}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-purple-300 font-semibold tracking-wide">
                    CONFIRM PASSWORD
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                      required
                      autoComplete="new-password"
                      className={`bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12 pr-12 ${
                        validationErrors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-700/50 text-slate-400 hover:text-purple-400"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-red-200">{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold tracking-wider rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        CREATING ACCOUNT...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        CREATE ACCOUNT
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-8 text-center space-y-4"
              >
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                </p>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return to Base
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
