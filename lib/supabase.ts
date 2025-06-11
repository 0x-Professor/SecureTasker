import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

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

export const createSupabaseServerClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
    )
  }
  return createServerComponentClient({ cookies })
}

// Demo mode fallback
export const isDemoMode = () => {
  return !isSupabaseConfigured()
}
