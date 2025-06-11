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
import { Shield, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react"
import { createSupabaseClient, isDemoMode } from "@/lib/supabase"

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

      if (isDemoMode()) {
        // Demo mode - simulate registration
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
        return
      }

      const supabase = createSupabaseClient()
      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: {
            full_name: validatedData.fullName,
          },
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-green-600">Registration Successful!</CardTitle>
            <CardDescription>
              {isDemoMode()
                ? "Demo account created! You'll be redirected to login shortly."
                : "Please check your email to verify your account. You'll be redirected to login shortly."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join SecureTasker with enterprise-grade security</CardDescription>
        </CardHeader>
        <CardContent>
          {isDemoMode() && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Demo Mode:</strong> Registration will create a demo account for testing purposes
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rest of the form remains the same */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className={validationErrors.fullName ? "border-red-500" : ""}
              />
              {validationErrors.fullName && <p className="text-sm text-red-600">{validationErrors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
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
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a strong password"
                  required
                  autoComplete="new-password"
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
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 w-full rounded ${
                          passwordStrength >= level
                            ? passwordStrength <= 2
                              ? "bg-red-500"
                              : passwordStrength <= 4
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength: {passwordStrength <= 2 ? "Weak" : passwordStrength <= 4 ? "Medium" : "Strong"}
                  </p>
                </div>
              )}
              {validationErrors.password && <p className="text-sm text-red-600">{validationErrors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  className={validationErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Sign in here
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
