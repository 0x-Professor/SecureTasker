import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== "your-project-url" && supabaseAnonKey !== "your-anon-key")
}

// Production mode - only use demo mode if explicitly in development without Supabase config
export const isDemoMode = () => {
  // Force production mode if we're in a production environment
  if (process.env.NODE_ENV === "production") {
    return false
  }

  // In development, check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.log("⚠️ Supabase not configured - using demo mode")
    return true
  }

  // If Supabase is configured, use production mode
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
