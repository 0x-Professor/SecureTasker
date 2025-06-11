"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, AlertTriangle } from "lucide-react"
import { createSupabaseClient, isDemoMode } from "@/lib/supabase"

// Input validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
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
        // Demo mode - simulate login
        if (validatedData.email === "demo@securetasker.com" && validatedData.password === "SecureDemo123!") {
          localStorage.setItem(
            "demo_user",
            JSON.stringify({
              email: validatedData.email,
              name: "Demo User",
            }),
          )
          router.push("/dashboard")
          return
        } else {
          setError("Demo mode: Use demo@securetasker.com / SecureDemo123!")
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Secure Login</CardTitle>
          <CardDescription>Access your secure task management dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {isDemoMode() && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Demo Mode:</strong> Use demo@securetasker.com / SecureDemo123! to login
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  validateInput("email", e.target.value)
                }}
                placeholder={isDemoMode() ? "demo@securetasker.com" : "Enter your email"}
                required
                autoComplete="email"
                className={validationErrors.email ? "border-red-500" : ""}
              />
              {validationErrors.email && <p className="text-sm text-red-600">{validationErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    validateInput("password", e.target.value)
                  }}
                  placeholder={isDemoMode() ? "SecureDemo123!" : "Enter your password"}
                  required
                  autoComplete="current-password"
                  className={validationErrors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {validationErrors.password && <p className="text-sm text-red-600">{validationErrors.password}</p>}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
