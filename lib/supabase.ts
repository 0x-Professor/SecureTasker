import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

export const createSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
    )
  }
  return createClientComponentClient()
}

// For server components, we'll handle auth on the client side in demo mode
export const createSupabaseServerClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
    )
  }
  // Return client component client for now - auth will be handled client-side
  return createClientComponentClient()
}

// Demo mode fallback
export const isDemoMode = () => {
  return !isSupabaseConfigured()
}

// Enhanced demo user management
export const getDemoUser = () => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("demo_user")
  return stored ? JSON.parse(stored) : null
}

export const setDemoUser = (user: any) => {
  if (typeof window === "undefined") return
  localStorage.setItem("demo_user", JSON.stringify(user))
}

export const clearDemoUser = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("demo_user")
  localStorage.removeItem("demo_tasks")
}
