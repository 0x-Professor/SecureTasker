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
  title: "CyberVault - Quantum Security Platform",
  description:
    "Advanced quantum-encrypted security platform with enterprise-grade protection and real-time threat monitoring",
  keywords: ["cybersecurity", "quantum encryption", "threat monitoring", "enterprise security"],
  authors: [{ name: "CyberVault Security Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`${inter.className} ${orbitron.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
