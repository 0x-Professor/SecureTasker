import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "SecureTasker - Secure Task Management",
  description: "A secure web-based task management application with enterprise-grade security features",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${orbitron.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
