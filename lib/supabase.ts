import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== "your-project-url" && supabaseAnonKey !== "your-anon-key")
}

// Production mode - only use demo mode if Supabase is not configured
export const isDemoMode = () => {
  // Check if we're in a development environment without proper Supabase config
  if (!isSupabaseConfigured()) {
    console.log("⚠️ Supabase not configured - using demo mode")
    return true
  }

  // In production, always use Supabase
  return false
}

export const createSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
    )
  }

  try {
    return createClientComponentClient()
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    throw new Error("Supabase client creation failed")
  }
}

// For server components
export const createSupabaseServerClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
    )
  }
  return createClientComponentClient()
}
