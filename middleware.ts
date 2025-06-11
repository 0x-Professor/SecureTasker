import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Security Headers - OWASP Recommended
  const securityHeaders = {
    // Prevent XSS attacks
    "X-XSS-Protection": "1; mode=block",
    // Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",
    // Prevent clickjacking
    "X-Frame-Options": "DENY",
    // Referrer policy
    "Referrer-Policy": "strict-origin-when-cross-origin",
    // Content Security Policy
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
    // Strict Transport Security (HTTPS only)
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    // Permissions Policy
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  }

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value)
  })

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
