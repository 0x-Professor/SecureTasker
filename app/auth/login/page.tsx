"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, AlertTriangle, Lock, ArrowLeft } from "lucide-react"
import { createSupabaseClient, isDemoMode } from "@/lib/supabase"
import { loginDemoUser } from "@/lib/demo-auth"
import { AnimatedBackground } from "@/components/animated-background"

// Input validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const router = useRouter()

  const validateInput = (field: string, value: string) => {
    try {
      if (field === "email") {
        loginSchema.shape.email.parse(value)
      } else if (field === "password") {
        loginSchema.shape.password.parse(value)
      }
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate all inputs
      const validatedData = loginSchema.parse({ email, password })

      if (isDemoMode()) {
        console.log("Attempting demo login for:", validatedData.email)

        // Use the new demo authentication system
        const session = loginDemoUser(validatedData.email, validatedData.password)

        if (session) {
          console.log("Login successful, redirecting to dashboard")
          router.push("/dashboard")
          return
        } else {
          console.log("Login failed - invalid credentials")
          setError("Invalid email or password. Please check your credentials and try again.")
          return
        }
      }

      const supabase = createSupabaseClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      })

      if (error) {
        setError("Invalid email or password. Please try again.")
        return
      }

      if (data.user) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
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
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <div className="absolute inset-0 border border-cyan-500/30 rounded-3xl"></div>

            <CardHeader className="text-center relative z-10 pt-8 pb-6">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30">
                    <Shield className="h-12 w-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]" />
                  </div>
                </div>
              </motion.div>

              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-orbitron tracking-wider">
                SECURE ACCESS
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg mt-2">
                Enter your credentials to access the quantum-secured platform
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 px-8 pb-8">
              {isDemoMode() && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <Alert className="mb-6 border-orange-500/30 bg-orange-500/10">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <AlertDescription className="text-orange-200">
                      <strong>Demo Mode:</strong> Use demo@securetasker.com / SecureDemo123! or your registered account
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-cyan-300 font-semibold tracking-wide">
                    EMAIL ADDRESS
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      validateInput("email", e.target.value)
                    }}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className={`bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl h-12 ${
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
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-cyan-300 font-semibold tracking-wide">
                    PASSWORD
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        validateInput("password", e.target.value)
                      }}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className={`bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl h-12 pr-12 ${
                        validationErrors.password ? "border-red-500" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-700/50 text-slate-400 hover:text-cyan-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {validationErrors.password && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.password}
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

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold tracking-wider rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        AUTHENTICATING...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        SECURE LOGIN
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center space-y-4"
              >
                <p className="text-slate-400">
                  {"Don't have an account? "}
                  <Link
                    href="/auth/register"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    Create Account
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
