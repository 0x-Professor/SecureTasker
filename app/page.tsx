import Link from "next/link"
import { Shield, CheckSquare, Lock, Zap, GitBranch, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Security Headers Applied via middleware */}
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <Shield className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SecureTasker</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A secure web-based task management application demonstrating OWASP best practices, automated security
            testing, and CI/CD integration.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/login">
                <Lock className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Input Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive client and server-side validation using Zod schemas to prevent injection attacks and
                ensure data integrity.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                XSS Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Output encoding and Content Security Policy headers to prevent cross-site scripting attacks and
                malicious code execution.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                Secure Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Bcrypt password hashing, JWT tokens, session management, and automatic logout with configurable
                timeouts.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-600" />
                OWASP Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Implementation of OWASP Top 10 security practices including CSRF protection, security headers, and
                secure configurations.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Security Scanning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automated static analysis with Bandit, dynamic testing capabilities, and continuous security monitoring
                in CI/CD pipeline.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-indigo-600" />
                CI/CD Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                GitHub Actions workflow with automated testing, security scans, code quality checks, and deployment
                automation.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Technical Implementation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>Built with modern security-first architecture and best practices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Frontend Security</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Content Security Policy (CSP)</li>
                  <li>• XSS Protection Headers</li>
                  <li>• CSRF Token Validation</li>
                  <li>• Input Sanitization</li>
                  <li>• Secure Cookie Configuration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Backend Security</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Password Hashing (bcrypt)</li>
                  <li>• JWT Token Management</li>
                  <li>• Rate Limiting</li>
                  <li>• SQL Injection Prevention</li>
                  <li>• Security Headers Middleware</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>SecureTasker demonstrates enterprise-level security practices for modern web applications.</p>
          <p className="mt-2">Built with Next.js, Supabase, and automated security testing.</p>
        </div>
      </div>
    </div>
  )
}
