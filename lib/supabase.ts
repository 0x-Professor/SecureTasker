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
