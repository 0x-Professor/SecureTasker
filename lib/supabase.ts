import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

// Check if we're in demo mode - more robust detection
export const isDemoMode = () => {
  // If no Supabase config, definitely demo mode
  if (!supabaseUrl || !supabaseAnonKey) {
    return true
  }

  // If config exists but is placeholder/invalid, use demo mode
  if (supabaseUrl.includes("your-project") || supabaseAnonKey.includes("your-anon-key")) {
    return true
  }

  // Additional check for common placeholder values
  if (supabaseUrl === "https://your-project.supabase.co" || supabaseAnonKey.length < 50) {
    return true
  }

  return false
}

export const createSupabaseClient = () => {
  // Force demo mode if Supabase is not properly configured
  if (isDemoMode()) {
    console.log("Using demo mode - Supabase not configured")
    throw new Error("Demo mode active - Supabase not available")
  }

  try {
    return createClientComponentClient()
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    throw new Error("Supabase client creation failed")
  }
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
// export const isDemoMode = () => {
//   return !isSupabaseConfigured()
// }

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

// Check if a user is registered in demo mode
export const isDemoUserRegistered = (email: string) => {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(`demo_registered_${email}`)
}

// Get registered demo user
export const getDemoRegisteredUser = (email: string) => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(`demo_registered_${email}`)
  return stored ? JSON.parse(stored) : null
}
